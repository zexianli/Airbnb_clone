import LogoWithoutText from '../../components/LogoWithoutText';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import * as Yup from 'yup';
import { TextField, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const propertyTypes = [
  {
    num: '0',
    type: 'Apartment',
    pictureUrl:
      'https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240',
  },
  {
    num: '1',
    type: 'House',
    pictureUrl:
      'https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg?im_w=240',
  },
  {
    num: '2',
    type: 'Secondary unit',
    pictureUrl:
      'https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg?im_w=240',
  },
  {
    num: '3',
    type: 'Unique space',
    pictureUrl:
      'https://a0.muscache.com/im/pictures/7ad56bb1-ed9f-4dcb-a14c-2523da331b44.jpg?im_w=240',
  },
];

const options2 = [
  { num: '5', letter: 'Five' },
  { num: '6', letter: 'Six' },
  { num: '7', letter: 'Seve' },
  { num: '8', letter: 'Eight' },
];

const MyTextField = styled(TextField)(() => ({
  '& .MuiFilledInput-input': {
    background: 'white',
  },
  '& .MuiFilledInput-root:after': {
    border: '2',
    borderColor: 'black',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'gray',
  },
}));

export default function listing() {
  const [data, setData] = useState({
    propertyType: 'Apartment',
    privacyType: '3',
    address: {
      street: '',
      zipCode: '',
      city: '',
      state: '',
    },
    floorPlan: {
      guests: '0',
      beds: '0',
      bedrooms: '0',
      bathrooms: '0',
    },
    amenities: [],
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };
  const handlePreviousStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const leftPanelText = [
    'What kind of place will you host?',
    "Where's your place located?",
  ];

  const steps = [
    <StepOne
      next={handleNextStep}
      prev={handlePreviousStep}
      data={data}
      currentStep={currentStep}
    />,
    <StepTwo
      next={handleNextStep}
      prev={handlePreviousStep}
      data={data}
      currentStep={currentStep}
    />,
  ];

  return (
    <>
      {/* Logo */}
      <LogoWithoutText />

      <main className="flex flex-row h-screen">
        {/* Left side */}
        <div className="relative w-6/12 bg-gradient-to-t from-purple-900 to-pink-600">
          <div className="absolute top-[45%] max-w-[80%] ml-14 text-white text-5xl font-semibold">
            {leftPanelText[currentStep]}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-between w-6/12 bg-white items-center">
          <div className="flex flex-row w-full justify-end">
            <button className="mt-8 mr-12 p-2 px-4 rounded-full text-white text-xs font-semibold bg-[#222222]">
              Exit
            </button>
          </div>

          {steps[currentStep]}
        </div>
      </main>
    </>
  );
}

const NextButton = (props) => {
  return (
    <button
      className="text-white p-6 py-3 mr-12 my-4 rounded-lg bg-black bg-opacity-80 font-semibold"
      type="submit"
      onClick={props.next}
    >
      Next
    </button>
  );
};

const StepOne = (props) => {
  const router = useRouter();
  const [curSelected, setCurSelected] = useState(props.data.propertyType);

  const myHandleSubmit = (values) => {
    console.log('Inside handleSubmit and the values are: ', values);
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={(values) => {
        myHandleSubmit(values);
      }}
    >
      {({ values, handleSubmit }) => (
        <>
          <Form className="w-10/12 max-w-2xl h-full">
            <div className="flex flex-col h-full m-auto">
              <div className="grid grid-cols-1 my-auto mx-8">
                {/* {propertyTypes.map((v, i) => (
                  <div
                    key={i}
                    className={`flex flex-row justify-between align-middle ${
                      curSelected === i
                        ? 'bg-gray-100 border-2 border-black'
                        : ''
                    } mb-2 pl-4 py-4 text-xl font-semibold border rounded-lg hover:border-black`}
                    onClick={() => setCurSelected(i)}
                  >
                    <label className="my-auto">
                      {v.type}
                      <Field
                        type="radio"
                        className="hidden"
                        name="propertyType"
                        value={v.type}
                      />
                    </label>
                    <div className="flex justify-center pr-4">
                      <Image
                        src={v.pictureUrl}
                        width={48}
                        height={48}
                        objectFit="fill"
                      />
                    </div>
                  </div>
                ))} */}
                {propertyTypes.map((v, i) => (
                  <Field
                    as="button"
                    key={i}
                    name="propertyType"
                    className={`flex flex-row justify-between align-middle mb-2 pl-4 py-4 text-xl font-semibold border rounded-lg hover:no-shift-border ${
                      curSelected === v.type
                        ? 'bg-gray-100 no-shift-border'
                        : ''
                    } `}
                    type="button"
                    onClick={() => {
                      setCurSelected(v.type);
                      values.propertyType = v.type;
                    }}
                  >
                    <label className="my-auto">
                      {v.type}
                      {/* <Field type="radio" name="propertyType" value={v.type} /> */}
                    </label>

                    <div className="flex justify-center pr-4">
                      <Image
                        src={v.pictureUrl}
                        className="rounded-md"
                        width={56}
                        height={56}
                        objectFit="fill"
                      />
                    </div>
                  </Field>
                ))}
              </div>
            </div>
          </Form>

          <div className="flex flex-row justify-between max-w-5xl w-full border-t-2 border-[#222222]">
            <button
              className="h-auto px-3 py-1 ml-9 my-6 rounded-lg hover:bg-gray-200 underline font-semibold"
              onClick={() => router.push('/become-a-host/intro')}
            >
              Back
            </button>

            <NextButton next={handleSubmit} />
          </div>
        </>
      )}
    </Formik>
  );
};

const addressSchema = Yup.object({
  address: Yup.object({
    street: Yup.string().min(4, 'Too short').required('Required'),
    zipCode: Yup.string()
      .min(5, 'Too short')
      .max(5, 'Too long')
      .required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
  }),
});

const StepTwo = (props) => {
  const myHandleSubmit = (values) => {
    console.log('this should be an API call', values);
    // props.next(values)
  };

  return (
    <Formik
      initialValues={props.data}
      validationSchema={addressSchema}
      onSubmit={(values) => {
        console.log('onSubmit called');
        myHandleSubmit(values);
      }}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <>
          <div className="flex flex-col max-w-[65%] border-2 rounded-lg shadow-lg">
            <div className="text-center text-lg font-semibold mt-4 mb-6 w-full">
              Confirm your address
            </div>
            <div className="content-center mx-6 border rounded-lg">
              <Form>
                <Field
                  as={MyTextField}
                  fullWidth
                  id="street"
                  label="Street"
                  variant="filled"
                  name="address.street"
                />
                {errors.address &&
                errors.address.street &&
                touched.address &&
                touched.address.street ? (
                  <div className="text-red-600 pl-3 text-sm">
                    {errors.address.street}
                  </div>
                ) : null}

                <Field
                  as={MyTextField}
                  fullWidth
                  id="city"
                  label="City"
                  variant="filled"
                  name="address.city"
                />
                {errors.address &&
                errors.address.city &&
                touched.address &&
                touched.address.city ? (
                  <div className="text-red-600 pl-3 text-sm">
                    {errors.address.city}
                  </div>
                ) : null}

                {/* <div className="grid grid-flow-col grid-cols-2 auto-rows-auto"> */}
                <div className="flex flex-row flex-wrap">
                  <Field
                    as={MyTextField}
                    className="w-1/2"
                    id="state"
                    label="State"
                    variant="filled"
                    name="address.state"
                  />

                  <Field
                    as={MyTextField}
                    className="w-1/2"
                    id="zipCode"
                    label="Zip code"
                    variant="filled"
                    name="address.zipCode"
                  />

                  {errors.address &&
                  errors.address.state &&
                  touched.address &&
                  touched.address.state ? (
                    <div className="text-red-600 pl-3 text-sm w-1/2 py-1">
                      {errors.address.state}
                    </div>
                  ) : null}

                  {errors.address &&
                  errors.address.zipCode &&
                  touched.address &&
                  touched.address.zipCode ? (
                    <div className="text-red-600 pl-3 text-sm w-1/2 py-1">
                      {errors.address.zipCode}
                    </div>
                  ) : null}
                </div>
                <FormControl fullWidth disabled={true}>
                  <InputLabel variant="filled" id="country-label">
                    Country
                  </InputLabel>
                  <Select label="country-label" value="" />
                </FormControl>
              </Form>
            </div>
            <div className="text-gray-600 mx-6 my-4">
              We’ll only share your address with guests who are booked as
              outlined in our{' '}
              <span className="underline text-black">
                <a href="/privacy-policy"> privacy policy.</a>
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between max-w-5xl w-full border-t-2 border-[#222222]">
            <button
              className="h-auto px-3 py-1 ml-9 my-6 rounded-lg hover:bg-gray-200 underline font-semibold"
              onClick={() => props.prev(values)}
            >
              Back
            </button>
            {/* <NextButton next={handleSubmit} /> */}
            <button
              className="text-white p-6 py-3 mr-12 my-4 rounded-lg bg-black bg-opacity-80 font-semibold"
              type="submit"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Formik>
  );
};
