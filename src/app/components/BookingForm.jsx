'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { api_url } from '../constants/base_url'
import { inquireSchema } from '../Validations/bookings/inquire.schema'
import { reservationSchema } from '../Validations/bookings/reservation.schema'
import { countryCodes } from '../constants/country_codes'
import Form from './shared/Form/Form'
import ErrorText from './shared/ErrorText'
import { notifyError, notifySuccess } from './shared/notify'

export const BookingForm = ({
  title,
  cruise,
  tourId,
  inquire,
  inquireData,
  children,
  isPending: inquirePending,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (inquireData) {
      setValue("from_date", inquireData.from_date);
      setValue("destination_id", inquireData.destination_id);
    }
  }, [inquireData]);

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

  const { data: pricings } = useQuery({
    queryKey: ["pricnings", searchPricings],
    queryFn: () =>
      axios.get(
        `${api_url}tourPricing/${tourId}?reservation_date=${getValues(
          "reservation_date"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("accessToken") : ''}`,
          },
        }

      ),
    enabled: !!reservationDate,
  });
  console.log("Pricing: ", pricings);

  useEffect(() => {
    setSearchPricings(!!(tourId && reservationDate));
  }, [tourId, reservationDate]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_url}reservation`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("accessToken") : ''}`,
        },
      }),
    onSuccess: (data) => {
      notifySuccess("You have successfully reserved this tour");
      router.push(`/my-reservations/${data?.data?.data?.id}`);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Something went wrong, please try again";
      notifyError(errorMessage);
    }
  });

  const submit = (data) => {
    const selectedPricingId = getValues("pricing_id");

    if (inquireData) {
      let mutationData = { ...data, ...inquireData };
      if (!inquireData.from_date) {
        mutationData.from_date = data.from_date;
        inquireData.from_date = data.from_date;
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
      inquire(mutationData);
    } else {
      mutate({
        ...data,
        tour_id: tourId,
        pricing_id: selectedPricingId,
        number_of_children: getValues("number_of_children"),
        additional_notes: getValues("additional_notes"),
      });
    }
  };

  return (
    <Form title={`From ${title}`} onSubmit={handleSubmit(submit)}>
      {children}
      {inquire && (
        <>
          {errors.destination_id && (
            <ErrorText>{errors.destination_id.message}</ErrorText>
          )}
          <Form.TextController
            placeholder="Email"
            register={register}
            registername="email"
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Form.SelectController
            placeholder="Select your Nationality"
            options={[
              "Afghan",
              "Albanian",
              "Algerian",
              "American",
              "Andorran",
              "Angolan",
              "Argentinian",
              "Armenian",
              "Australian",
              "Austrian",
              "Azerbaijani",
              "Bahamian",
              "Bahraini",
              "Bangladeshi",
              "Barbadian",
              "Belarusian",
              "Belgian",
              "Belizean",
              "Beninese",
              "Bhutanese",
              "Bolivian",
              "Bosnian",
              "Botswanan",
              "Brazilian",
              "British",
              "Bruneian",
              "Bulgarian",
              "Burkinabe",
              "Burmese",
              "Burundian",
              "Cambodian",
              "Cameroonian",
              "Canadian",
              "Cape Verdean",
              "Central African",
              "Chadian",
              "Chilean",
              "Chinese",
              "Colombian",
              "Comoran",
              "Congolese (Congo-Brazzaville)",
              "Congolese (Congo-Kinshasa)",
              "Costa Rican",
              "Croatian",
              "Cuban",
              "Cypriot",
              "Czech",
              "Danish",
              "Djiboutian",
              "Dominican",
              "Dutch",
              "East Timorese",
              "Ecuadorian",
              "Egyptian",
              "Emirati",
              "English",
              "Equatorial Guinean",
              "Eritrean",
              "Estonian",
              "Ethiopian",
              "Fijian",
              "Finnish",
              "French",
              "Gabonese",
              "Gambian",
              "Georgian",
              "German",
              "Ghanaian",
              "Greek",
              "Grenadian",
              "Guatemalan",
              "Guinean",
              "Guinea-Bissauan",
              "Guyanese",
              "Haitian",
              "Honduran",
              "Hungarian",
              "Icelandic",
              "Indian",
              "Indonesian",
              "Iranian",
              "Iraqi",
              "Irish",
              "Israeli",
              "Italian",
              "Ivorian",
              "Jamaican",
              "Japanese",
              "Jordanian",
              "Kazakh",
              "Kenyan",
              "Kiribati",
              "Kuwaiti",
              "Kyrgyz",
              "Lao",
              "Latvian",
              "Lebanese",
              "Liberian",
              "Libyan",
              "Liechtenstein",
              "Lithuanian",
              "Luxembourgish",
              "Macedonian",
              "Malagasy",
              "Malawian",
              "Malaysian",
              "Maldivian",
              "Malian",
              "Maltese",
              "Marshallese",
              "Mauritanian",
              "Mauritian",
              "Mexican",
              "Micronesian",
              "Moldovan",
              "Monegasque",
              "Mongolian",
              "Montenegrin",
              "Moroccan",
              "Mozambican",
              "Namibian",
              "Nauruan",
              "Nepalese",
              "New Zealander",
              "Nicaraguan",
              "Nigerian",
              "Nigerien",
              "North Korean",
              "Norwegian",
              "Omani",
              "Pakistani",
              "Palauan",
              "Palestinian",
              "Panamanian",
              "Papua New Guinean",
              "Paraguayan",
              "Peruvian",
              "Philippine",
              "Polish",
              "Portuguese",
              "Qatari",
              "Romanian",
              "Russian",
              "Rwandan",
              "Saint Lucian",
              "Salvadoran",
              "Samoan",
              "San Marinese",
              "Sao Tomean",
              "Saudi Arabian",
              "Scottish",
              "Senegalese",
              "Serbian",
              "Seychellois",
              "Sierra Leonean",
              "Singaporean",
              "Slovak",
              "Slovenian",
              "Solomon Islander",
              "Somali",
              "South African",
              "South Korean",
              "Spanish",
              "Sri Lankan",
              "Sudanese",
              "Surinamese",
              "Swazi",
              "Swedish",
              "Swiss",
              "Syrian",
              "Taiwanese",
              "Tajik",
              "Tanzanian",
              "Thai",
              "Togolese",
              "Tongan",
              "Trinidadian/Tobagonian",
              "Tunisian",
              "Turkish",
              "Turkmen",
              "Tuvaluan",
              "Ugandan",
              "Ukrainian",
              "Uruguayan",
              "Uzbek",
              "Vanuatuan",
              "Vatican citizen",
              "Venezuelan",
              "Vietnamese",
              "Welsh",
              "Yemeni",
              "Zambian",
              "Zimbabwean",
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
            selectedCode={getValues("contact_number")}
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
        <div className="form-sub-container">
          <Form.DateTimeController
            label="Start date"
            defaultValue={
              inquireData?.from_date || getValues("from_date") || ""
            }
            register={register}
            registername="from_date"
          />
          {errors.from_date && (
            <ErrorText>{errors.from_date.message}</ErrorText>
          )}
          <Form.DateTimeController
            label="End date"
            register={register}
            registername="to_date"
          />
          {errors.to_date && (
            <ErrorText>{errors.to_date.message}</ErrorText>
          )}
        </div>
      )}

      <div className="booking-details-container">
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

      {reservationDate && (
        <>
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
            {pricings?.data?.data?.data?.map((price) => (
              <option key={price.id} value={price?.id}>
                {price.name}
              </option>
            ))}
          </select>

          {errors.pricing_id && <ErrorText>{errors.pricing_id.message}</ErrorText>}
        </>
      )}

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
