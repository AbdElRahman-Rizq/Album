'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { api_url } from '../../constants/base_url'
import { inquireSchema } from '../../Validations/bookings/inquire.schema'
import { reservationSchema } from '../../Validations/bookings/reservation.schema'
import { countryCodes } from '../../constants/country_codes'
import Cookies from 'js-cookie';
import Form from './../shared/Form/Form'
import ErrorText from './../shared/ErrorText'
import { notifyError, notifySuccess } from './../shared/notify'
import { MdOutlineEmail } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'
import styles from './../shared/Form/Form.module.css'

export const BookingForm = ({
  title,
  cruise,
  tourId,
  inquire,
  inquireData,
  children,
  isPending: inquirePending,
  requireLogin,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const accessToken = typeof window !== 'undefined' ? Cookies.get('album-token') : null;

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
            Authorization: `Bearer ${typeof window !== 'undefined' ? Cookies.get('album-token') : ''}`,
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
          Authorization: `Bearer ${typeof window !== 'undefined' ? Cookies.get('album-token') : ''}`,
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
    console.log('Form data being sent:', data);
    console.log('Nationality:', data.nationality);
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
    console.log('Final data being sent:', data);
  };

  const router = useRouter();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (requireLogin && !accessToken) {
      notifyError("Please login before making a reservation");
      return;
    }

    handleSubmit(submit)(event);
  };

  return (
    <Form title={`${title}`} onSubmit={handleFormSubmit}>
      {children}
      {inquire && (
        <>
          {errors.destination_id && (
            <ErrorText>{errors.destination_id.message}</ErrorText>
          )}
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <Form.TextController
            placeholder="Email"
            register={register}
            registername="email"
            icon={<MdOutlineEmail />}
          />
          {errors.nationality && (
            <ErrorText>{errors.nationality.message}</ErrorText>
          )}
          <Form.SelectController
            placeholder="Select your Nationality"
            options={[
              "Afghan",
              "Albanian",
              "Algerian",
              "American",
              "Andorran",
              "Angolan",
              "Antiguan and Barbudan",
              "Argentine",
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
              "Bosnian and Herzegovinian",
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
              "Dominican (Dominican Republic)",
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
              "Filipino",
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
              "Kazakhstani",
              "Kenyan",
              "Kiribati",
              "Korean (North)",
              "Korean (South)",
              "Kuwaiti",
              "Kyrgyz",
              "Laotian",
              "Latvian",
              "Lebanese",
              "Lesotho",
              "Liberian",
              "Libyan",
              "Liechtensteiner",
              "Lithuanian",
              "Luxembourg",
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
              "Monacan",
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
              "Norwegian",
              "Omani",
              "Pakistani",
              "Palauan",
              "Palestinian",
              "Panamanian",
              "Papua New Guinean",
              "Paraguayan",
              "Peruvian",
              "Polish",
              "Portuguese",
              "Qatari",
              "Romanian",
              "Russian",
              "Rwandan",
              "Saint Kitts and Nevis",
              "Saint Lucian",
              "Saint Vincent and the Grenadines",
              "Samoan",
              "San Marinese",
              "Sao Tomean",
              "Saudi Arabian",
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
              "Trinidadian and Tobagonian",
              "Tunisian",
              "Turkish",
              "Turkmen",
              "Tuvaluan",
              "Ugandan",
              "Ukrainian",
              "Uruguayan",
              "Uzbekistani",
              "Vanuatuan",
              "Vatican",
              "Venezuelan",
              "Vietnamese",
              "Yemeni",
              "Zambian",
              "Zimbabwean"
            ]}

            {...register("nationality", { required: "Please select your nationality" })}
            icon={<TbWorld />}
          />
          <Form.TextController
            placeholder="Mobile"
            selectPlaceholder="Code"
            register={register}
            registername="contact_number"
            options={countryCodes.map((item) => `${item.name} (${item.code})`)}
            values={countryCodes.map((item) => item.code)}
            setValue={setValue}
            selectedCode={getValues("contact_number")}
            icon={<FiPhone />}
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
            icon={<FaRegCalendarAlt />}
          />
          {errors.reservation_date && (
            <ErrorText>{errors.reservation_date.message}</ErrorText>
          )}
        </>
      )}
      {inquire && (
        <div className={styles.dateInputsContainer}>
          <div className={styles.dateInputs}>
            <Form.DateTimeController
              label="Start date"
              defaultValue={inquireData?.from_date || getValues("from_date") || ""}
              register={register}
              registername="from_date"
              icon={<FaRegCalendarAlt />}
            />
            <Form.DateTimeController
              label="End date"
              register={register}
              registername="to_date"
              icon={<FaRegCalendarAlt />}
            />
          </div>
          {errors.from_date && (
            <ErrorText>{errors.from_date.message}</ErrorText>
          )}
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

      {formSubmitted && requireLogin && !accessToken && (
        <ErrorText>Please login before making a reservation</ErrorText>
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
