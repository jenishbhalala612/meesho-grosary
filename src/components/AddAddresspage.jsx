import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
import { addressdataAction } from "../redux/actions/Addressdata.action";
import axios from "axios";
<style>{`

        .w-full.py-\[12px\].px-\[16px\].border-t-\[1px\].border-\[\#CECEDE\].bg-white.flex.justify-between.items-center.fixed.bottom-0.z-\[9999999\] {
    max-width: 360px;
    position: relative;
}

      `}</style>
function AddAddresspage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localstoageid = localStorage.getItem('idname')
  const validationSchema = Yup.object({
    house: Yup.string().nullable().optional(),
    road: Yup.string().nullable().optional(),
    pincode: Yup.number().positive().integer().nullable().optional(),
    city: Yup.string().nullable().optional(),
    state: Yup.string().nullable().optional(),
    nearby: Yup.string().nullable().optional(),
    name: Yup.string().nullable().optional(),
    contact: Yup.number().positive().integer().nullable().optional(),
  });
  const formik = useFormik({
    initialValues: {
      house: "",
      road: "",
      pincode: "",
      city: "",
      state: "",
      nearby: "",
      name: "",
      contact: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addressdataAction(values));
      navigate("/checkout");
    },
  });
  const { errors, touched, values, handleBlur, handleChange, handleSubmit } =
    formik;
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            formik?.setValues({
              state: response?.data?.address?.state,
              city: response?.data?.address?.state_district,
              pincode: response?.data?.address?.postcode,
              nearby: response?.data?.display_name
            })
          } catch (error) {
            console.log('Error fetching address');
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  return (
    <>
      <div className="w-full min-h-screen pb-[100px] bg-[#f5f5f7]"><div className="w-full max-w-[500px] mx-auto min-h-screen bg-white">
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="w-full bg-white p-[16px] flex justify-start items-center">
              <button
                onClick={() => {
                  navigate("/cart");
                }}
                type="button"
                className="m-0 p-0 w-fit bg-transparent"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="#353543"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z"
                    className="w-[20px] h-[20px]"
                  ></path>
                </svg>
              </button>
              <p className="text-[13px] w-[calc(100%_-_20px)] text-center text-[rgb(53_53_67)] font-[500]">
                ADD DELIVERY ADDRESS
              </p>
            </div>
            <div className="w-full pt-[px] pb-[28px] px-[16px] bg-white">
              <div className="flex justify-between items-center">
                <div className="flex justify-between gap-2 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-[20px] h-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" fill="white"></rect>
                    <path
                      d="M15.2565 17.8276C15.2565 19.0296 12.9683 19.9999 10.1588 19.9999C7.34922 19.9999 5.06104 19.0296 5.06104 17.8276C5.07552 17.6683 5.14793 17.4945 5.22034 17.3642C5.72722 16.3794 7.75472 15.6553 10.1877 15.6553C12.6207 15.6553 14.6483 16.3794 15.1406 17.3642C15.2131 17.4945 15.2565 17.6683 15.2565 17.8276Z"
                      fill="#3A66CF"
                    ></path>
                    <path
                      d="M17.0527 6.4301C16.5313 -0.0434386 10.1157 7.62167e-06 10.1157 7.62167e-06C10.1157 7.62167e-06 3.6711 -0.0434386 3.14974 6.4301C2.70079 12.1651 8.49367 16.9152 9.82603 17.929C9.89844 17.9869 9.99982 18.0159 10.1012 18.0159C10.2026 18.0159 10.2895 17.9869 10.3764 17.929C11.7087 16.9152 17.5161 12.1651 17.0527 6.4301ZM10.1157 9.71756C9.57984 9.71756 9.05848 9.55826 8.62401 9.26861C8.17506 8.97897 7.82749 8.55899 7.62474 8.06659C7.42199 7.5742 7.36406 7.03835 7.46544 6.517C7.56681 5.99564 7.82749 5.51772 8.20403 5.14119C8.58056 4.76465 9.05848 4.50397 9.57984 4.4026C10.1012 4.30122 10.637 4.34467 11.1294 4.54742C11.6218 4.75017 12.0418 5.09774 12.3459 5.53221C12.6356 5.98116 12.7949 6.50251 12.7949 7.02387C12.7949 7.7335 12.5197 8.41416 12.0128 8.92104C11.506 9.42792 10.8253 9.71756 10.1157 9.71756Z"
                      fill="#90B1FB"
                    ></path>
                  </svg>
                  <p className="text-[17px] capitalize w-fit text-[rgb(53_53_67)] font-[500]">
                    Address
                  </p>
                </div>
                <button
                  onClick={() => { getLocation() }}
                  type="button"
                  className={`m-0 h-[26px] w-fit
                    border-[#570d48] px-[12px] text-[rgb(159_32_137)] bg-transparent text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="#570d48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.04964 12.0863C9.83093 12.0863 12.0856 9.83165 12.0856 7.05036C12.0856 4.26907 9.83093 2.01439 7.04964 2.01439C4.26835 2.01439 2.01367 4.26907 2.01367 7.05036C2.01367 9.83165 4.26835 12.0863 7.04964 12.0863ZM7.04964 11.0791C9.27467 11.0791 11.0784 9.27539 11.0784 7.05036C11.0784 4.82533 9.27467 3.02158 7.04964 3.02158C4.82461 3.02158 3.02087 4.82533 3.02087 7.05036C3.02087 9.27539 4.82461 11.0791 7.04964 11.0791Z"
                      className="w-[15px] h-[15px]"
                    ></path>
                    <circle
                      cx="7.04924"
                      cy="7.05036"
                      r="2.51799"
                      className="fill-pink"
                    ></circle>
                    <rect
                      x="6.5459"
                      width="1.00719"
                      height="2.41727"
                      rx="0.503597"
                      className="fill-pink"
                    ></rect>
                    <rect
                      x="6.5459"
                      y="11.5827"
                      width="1.00719"
                      height="2.41727"
                      rx="0.503597"
                      className="fill-pink"
                    ></rect>
                    <rect
                      x="14.0498"
                      y="6.49635"
                      width="1.00719"
                      height="2.41727"
                      rx="0.503597"
                      transform="rotate(90 14.0498 6.49635)"
                      className="fill-pink"
                    ></rect>
                    <rect
                      x="2.4668"
                      y="6.49635"
                      width="1.00719"
                      height="2.41727"
                      rx="0.503597"
                      transform="rotate(90 2.4668 6.49635)"
                      className="fill-pink"
                    ></rect>
                  </svg>
                  Use My Location
                </button>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <div className="relative mt-[22px]">
                    <input
                      type="text"
                      id="floating_filled"
                      name="house"
                      value={values?.house}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                      placeholder=" "
                    />
                    <label
                      for="floating_filled"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      House no./ Building Name
                    </label>
                  </div>
                  {errors?.house && touched?.house && (
                    <p className="text-[16px] text-[red] font-normal">
                      {errors?.house}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="relative mt-[22px]">
                    <input
                      type="text"
                      id="floating_filled1"
                      name="road"
                      value={values?.road}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                      placeholder=" "
                    />
                    <label
                      for="floating_filled1"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Road Name / Area / Colony
                    </label>
                  </div>
                  {errors?.road && touched?.road && (
                    <p className="text-[16px] text-[red] font-normal">
                      {errors?.road}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="relative mt-[22px]">
                    <input
                      type="number"
                      inputMode="numeric"
                      id="floating_filled2"
                      name="pincode"
                      value={values?.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                      placeholder=" "
                    />
                    <label
                      for="floating_filled2"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Pincode
                    </label>
                  </div>
                  {errors?.pincode && touched?.pincode && (
                    <p className="text-[16px] text-[red] font-normal">
                      {errors?.pincode}
                    </p>
                  )}
                </div>
                <div className="flex gap-[20px] mt-[22px]">
                  <div className="w-[50%]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="floating_filled3"
                        name="city"
                        value={values?.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                        placeholder=" "
                      />
                      <label
                        for="floating_filled3"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        City
                      </label>
                    </div>
                    {errors?.city && touched?.city && (
                      <p className="text-[16px] text-[red] font-normal">
                        {errors?.city}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={values?.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="floating_filled7"
                        name="state"
                        className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                        placeholder=" "
                      />
                      <label
                        for="floating_filled7"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        State
                      </label>
                    </div>
                    {errors?.state && touched?.state && (
                      <p className="text-[16px] text-[red] font-normal">
                        {errors?.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative w-[100%] mt-[22px]">
                    <input
                      type="text"
                      id="floating_filled4"
                      name="nearby"
                      value={values?.nearby}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                      placeholder=" "
                    />
                    <label
                      for="floating_filled4"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Nearby Famous Place/Shop/School,etc.
                    </label>
                  </div>
                  {errors?.nearby && touched?.nearby && (
                    <p className="text-[16px] text-[red] font-normal">
                      {errors?.nearby}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full py-[20px] px-[16px] bg-white mb-[8px]">
              <div className="flex justify-start items-center">
                <div className="flex justify-between gap-2 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 21"
                    fill="none"
                    className="w-[20px] h-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1522_57011)">
                      <rect
                        width="20"
                        height="20"
                        transform="translate(0 0.00976562)"
                        fill="white"
                      ></rect>
                      <path
                        d="M14.593 20.0091C13.5181 19.9746 12.4604 19.7289 11.4804 19.2862C8.45469 17.9939 5.78969 15.9836 3.71599 13.4293C2.39116 11.8624 1.3348 10.0869 0.590009 8.17486C0.227512 7.27808 0.0281174 6.32381 0.00105824 5.35692C-0.0100763 4.95222 0.0667688 4.54982 0.226245 4.17771C0.385722 3.8056 0.623953 3.4725 0.924685 3.20146C1.42001 2.7463 1.88196 2.25123 2.36389 1.78268C2.52463 1.61121 2.72157 1.47781 2.94042 1.39212C3.15928 1.30643 3.39446 1.27046 3.62889 1.28721C3.98177 1.31884 4.31183 1.47562 4.55938 1.72908C5.42954 2.58585 6.30631 3.4427 7.14969 4.31955C7.30315 4.46378 7.42431 4.6386 7.50528 4.83301C7.58626 5.02741 7.6252 5.23693 7.61951 5.44745C7.61382 5.65797 7.56363 5.86495 7.47227 6.0547C7.38091 6.24445 7.25058 6.41249 7.08955 6.54822C6.60762 7.04354 6.10548 7.52559 5.61685 8.00752C5.44282 8.18825 5.4362 8.21513 5.52991 8.4494C5.93695 9.33211 6.47385 10.1489 7.12289 10.8725C8.07948 12.0422 9.20789 13.0598 10.4697 13.8912C10.8378 14.1254 11.2394 14.3128 11.6276 14.5203C11.7615 14.5939 11.8619 14.5202 11.9556 14.4265L13.4417 12.9339C13.5837 12.7672 13.7601 12.6334 13.9589 12.5417C14.1577 12.4499 14.374 12.4024 14.593 12.4024C14.8119 12.4024 15.0281 12.4499 15.2269 12.5417C15.4256 12.6334 15.6022 12.7672 15.7442 12.9339C16.5608 13.7371 17.364 14.5471 18.1739 15.357L18.3012 15.4975C18.5553 15.7701 18.6965 16.1289 18.6965 16.5016C18.6965 16.8742 18.5553 17.233 18.3012 17.5056C18.0803 17.7666 17.8192 17.9943 17.5715 18.2419C17.3239 18.4896 17.0762 18.7238 16.8486 18.9848C16.5765 19.3173 16.2315 19.5825 15.8403 19.7601C15.4491 19.9377 15.0223 20.0231 14.593 20.0091Z"
                        fill="#5580E6"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.39747 0.482418C9.42213 0.197803 9.67284 -0.0129324 9.95746 0.0117269C10.8051 0.0851666 11.6389 0.272565 12.4365 0.568791C14.2869 1.20535 15.9281 2.33566 17.1825 3.83772C18.4358 5.33851 19.2553 7.15318 19.5525 9.08565C19.588 9.26672 19.6124 9.4497 19.6256 9.63328C19.6462 9.91822 19.4319 10.1659 19.1469 10.1864C18.862 10.207 18.6143 9.9927 18.5938 9.70776C18.5833 9.5626 18.5639 9.41833 18.5356 9.27608C18.534 9.26845 18.5327 9.26079 18.5315 9.25311C18.2643 7.50312 17.5231 5.85963 16.3884 4.50085C15.2537 3.1421 13.7686 2.11997 12.0943 1.54512L12.0817 1.54082L12.0818 1.54066C11.3697 1.27561 10.6251 1.10799 9.86816 1.04241C9.58355 1.01775 9.37281 0.767033 9.39747 0.482418Z"
                        fill="#3A66CF"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.48357 4.13923C9.5333 3.85791 9.80167 3.67017 10.083 3.7199C11.5346 3.97652 12.8728 4.67193 13.9171 5.71237C14.9614 6.75285 15.6616 8.08858 15.9236 9.53922C15.9744 9.82035 15.7877 10.0894 15.5065 10.1402C15.2254 10.191 14.9563 10.0042 14.9056 9.72309C14.6811 8.48049 14.0813 7.3364 13.1869 6.44526C12.2924 5.55408 11.1463 4.95845 9.9029 4.73865C9.62158 4.68891 9.43384 4.42055 9.48357 4.13923Z"
                        fill="#3A66CF"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1522_57011">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0 0.00976562)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-[17px] capitalize w-fit text-[rgb(53_53_67)] font-[500]">
                    Contact Details
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex gap-[20px] mt-[22px]">
                  <div className="w-[50%]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="floating_filled5"
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                        placeholder=" "
                      />
                      <label
                        for="floating_filled5"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Name
                      </label>
                    </div>
                    {errors?.name && touched?.name && (
                      <p className="text-[16px] text-[red] font-normal">
                        {errors?.name}
                      </p>
                    )}
                  </div>

                  <div className="w-[50%]">
                    <div className="relative w-full">
                      <input
                        type="number"
                        inputMode="numeric"
                        id="floating_filled6"
                        name="contact"
                        value={values?.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block rounded-t-lg pt-[22px] w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#570d48] peer focus:border-b-[2px]"
                        placeholder=" "
                      />
                      <label
                        for="floating_filled6"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  peer-focus:text-[#570d48] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Contact Number
                      </label>
                    </div>
                    {errors?.contact && touched?.contact && (
                      <p className="text-[16px] text-[red] font-normal">
                        {errors?.contact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full py-[12px] px-[16px] border-t-[1px] border-[#CECEDE] bg-white flex justify-between items-center fixed bottom-0 z-[9999999]">
              <button
                type="submit"
                className={`m-0 h-[46px] w-full
                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
              >
                Save Address and Continue
              </button>
            </div>
          </Form>
        </Formik>
        </div>
      </div>
    </>
  );
}

export default AddAddresspage;
