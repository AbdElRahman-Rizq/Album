'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { api_url } from '@/constants/base_url';
import { reservationSchema, inquireSchema } from '@/utils/validationSchemas';
import style from './BookingForm.module.css';
import Form from '@/components/shared/Form';
import ErrorText from '@/components/shared/ErrorText';
import countryCodes from '@/constants/countryCodes';

const BookingForm = ({
  title,
  cruise,
  tourId,
  inquire,
  inquireData,
  children,
  isPending: inquirePending,
}) => {
  const inquireDefaultValues = {
    destination_id: "",
    nationality: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: inquire
      ? zodResolver(inquireSchema)
      : zodResolver(reservationSchema),
    defaultValues: inquire ? inquireDefaultValues : {},
  });

  const reservationDate = watch("reservation_date");
  const [searchPricings, setSearchPricings] = useState(false);
  const [pricings, setPricings] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchPricings = async () => {
      if (tourId && reservationDate) {
        try {
          const response = await axios.get(
            `${api_url}tourPricing/${tourId}?reservation_date=${reservationDate}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setPricings(response.data);
        } catch (error) {
          console.error("Error fetching pricings:", error);
        }
      }
    };

    fetchPricings();
  }, [tourId, reservationDate]);

  const submit = async (data) => {
    setIsPending(true);
    try {
      const selectedPricingId = getValues("pricing_id");

      if (inquireData) {
        let mutationData = { ...data, ...inquireData };
        
        if (!inquireData.from_date) {
          mutationData.from_date = data.from_date;
          setValue("from_date", data.from_date);
        }

        const code = getValues("code");
        if (code) {
          const normalizedCode = code.replace("+", "");
          if (mutationData.contact_number.startsWith(normalizedCode)) {
            mutationData.contact_number = mutationData.contact_number.slice(
              normalizedCode.length
            );
          }
        }

        // Call inquire function passed as prop
        if (typeof inquire === 'function') {
          inquire(mutationData);
        }
      } else {
        const reservationData = {
          ...data,
          tour_id: tourId,
          pricing_id: selectedPricingId,
          number_of_children: getValues("number_of_children"),
          additional_notes: getValues("additional_notes"),
        };

        const response = await axios.post(`${api_url}reservation`, reservationData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        // Handle successful reservation (e.g., show success message, redirect)
        console.log("Reservation successful:", response.data);
      }
    } catch (error) {
      console.error("Reservation error:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form title={`From ${title}`} onSubmit={handleSubmit(submit)}>
      {children}
      
      {inquire && (
        <>
          <Form.TextController
            placeholder="Email"
            register={register}
            registername="email"
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Form.SelectController
            placeholder="Select your Nationality"
            options={[
              // List of nationalities (same as in your original code)
              "Afghan", "Albanian", "Algerian", 
              // ... other nationalities
            ]}
            onChange={(e) => {
              setValue("nationality", e.target.value);
            }}
          />
          {errors.nationality && (
            <ErrorText>{errors.nationality.message}</ErrorText>
          )}

          <Form.TextController
            placeholder="Mobile"
            selectPlaceholder="Code"
            register={register}
            registername="contact_number"
            options={countryCodes.map((item) => `${item.name} (${item.code})`)}
            values={countryCodes.map((item) => item.code)}
            setValue={setValue}
          />
          {errors.contact_number && (
            <ErrorText>{errors.contact_number.message}</ErrorText>
          )}
        </>
      )}

      {!inquire && (
        <>
          <Form.DateTimeController
            label="Reservation Date"
            register={register}
            registername="reservation_date"
          />
          {errors.reservation_date && (
            <ErrorText>{errors.reservation_date.message}</ErrorText>
          )}
        </>
      )}

      {inquire && (
        <div className={style.formSubContainer}>
          <Form.DateTimeController
            label="Start date"
            defaultValue={
              inquireData?.from_date || getValues("from_date") || ""
            }
            register={register}
            registername="from_date"
          />
          <Form.DateTimeController
            label="End date"
            register={register}
            registername="to_date"
          />
        </div>
      )}

      {inquire && (
        <div className={style.formSubContainer}>
          {errors.from_date && <ErrorText>{errors.from_date.message}</ErrorText>}
          {errors.to_date && <ErrorText>{errors.to_date.message}</ErrorText>}
        </div>
      )}

      <div className={style.counterSection}>
        <Form.CounterController
          initialValue={2}
          label={"No. of Adults"}
          helperText={"( + 12 years )"}
          minValue={1}
          setValue={setValue}
          registername={inquire ? "adult_count" : "number_of_adults"}
        />
        <Form.CounterController
          initialValue={0}
          label={"No. of Children"}
          helperText={"( 2 to 11 years )"}
          minValue={0}
          setValue={setValue}
          registername={inquire ? "child_count" : "number_of_children"}
        />
        <Form.CounterController
          initialValue={0}
          label={"No. of Infants"}
          helperText={"( 0 to 2 years )"}
          minValue={0}
          setValue={setValue}
          registername={inquire ? "baby_count" : "number_of_infants"}
        />
      </div>

      <Form.TextareaController
        register={register}
        registername="additional_notes"
        placeholder="Please advise your tour requirements"
      />

      <label>Select Pricing</label>
      <select
        {...register("pricing_id", {
          required: "Please select a pricing option",
        })}
        onChange={(e) => setValue("pricing_id", e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select a Pricing Option
        </option>
        {pricings?.data?.data?.map((price) => (
          <option key={price.id} value={price?.id}>
            {price.name}
          </option>
        ))}
      </select>

      {errors.pricing_id && <ErrorText>{errors.pricing_id.message}</ErrorText>}

      <Form.ButtonController
        type="submit"
        disabled={isPending || inquirePending}
      >
        Submit
      </Form.ButtonController>
    </Form>
  );
};

export default BookingForm;
