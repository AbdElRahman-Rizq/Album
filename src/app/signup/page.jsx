"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api_url } from "@/constants/base_url";
import { signupSchema } from "@/login/Validations/signup.schema";
import { notifyError, notifySuccess } from "@/components/shared/notify";
import AuthForm from "@/components/AuthForm/AuthForm";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const [verifyEmailBox, setVerifyEmailBox] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const schema = signupSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Mutation for registration
  const { mutate: registerUser, isPending: isLoading } = useMutation({
    mutationFn: (data) => {
      return axios.post(`${api_url}auth/register`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      console.log("Registration successful", data);
      setVerifyEmailBox(true);
    },
    onError: (error) => {
      // console.error("Registration failed:", error);
      notifyError(error?.response?.data?.message || "Registration failed");
    },
  });

  // Mutation for verification
  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: (verificationData) => {
      return axios.post(`${api_url}auth/verifyEmail`, verificationData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      console.log("Email verification successful");
      notifySuccess("Email verification successful");
      setVerifyEmailBox(false);
      router.push("/login");
    },
    onError: (error) => {
      // console.error("Verification failed:", error);
      notifyError(error?.response?.data?.message || "Verification failed");
    },
  });

  // Form submission
  const onSubmit = (data) => {
    delete data.confirmPassword;
    data.role = "user";
    setEmail(data.email);
    registerUser(data);
  };

  // Verification code submission
  const handleVerificationSubmit = () => {
    const verificationData = {
      email,
      verification_code: verificationCode,
    };
    verifyCode(verificationData);
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(images/bg.jpg)` }}
    >
      <div className="login-from-wrap">
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <h1 className="site-title">
            <a href="#">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={100}
                height={50}
              />
            </a>
          </h1>

          <AuthForm.TextController
            id="username"
            label="Username"
            errors={errors}
            register={register}
            name="name"
          />

          <AuthForm.TextController
            id="email"
            label="Email"
            errors={errors}
            register={register}
            name="email"
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
            <AuthForm.TextController
              id="countryCode"
              label="Country Code"
              errors={errors}
              register={register}
              name="countryCode"
            />
            <AuthForm.TextController
              id="phone"
              label="Phone"
              errors={errors}
              register={register}
              name="phone"
            />
          </div>

          <AuthForm.TextController
            id="password"
            label="Password"
            type="password"
            errors={errors}
            register={register}
            name="password"
          />

          <AuthForm.TextController
            id="c-password"
            label="Confirm Password"
            type="password"
            errors={errors}
            register={register}
            name="confirmPassword"
          />

          <AuthForm.ButtonController isLoading={isLoading} type="submit">
            Register
          </AuthForm.ButtonController>

          <p className="swap-login-signup">
            Already have an account? <a href="/login">Login</a>.
          </p>
        </AuthForm>
      </div>

      {/* Verification Modal */}
      {verifyEmailBox && (
        <Modal isAppear onClose={() => setVerifyEmailBox(false)}>
          <div className="verify-email-box">
            <h2>Verify Your Email</h2>
            <p>
              We have sent a verification email to <strong>{email}</strong>.
            </p>
            <p>
              Please check your inbox and enter the code to verify your email.
            </p>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              className="button-primary"
              onClick={handleVerificationSubmit}
              style={{ backgroundColor: isVerifying ? "gray" : "" }}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Submit Code"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Signup;
