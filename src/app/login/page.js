"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TiHome } from "react-icons/ti";

import { api_url } from "@/constants/base_url";
import AuthForm from "@/components/AuthForm/AuthForm";
import ROLES from "@/constants/roles";

import Cookies from "js-cookie";
import { loginSchema } from "./Validations/login.schema";
import "@/page.module.css";
import { notifyError, notifySuccess } from "@/components/shared/notify";
import "./login.css";
import "@/components/AuthForm/AuthForm.css";

export default function Login() {
  const router = useRouter();
  const schema = loginSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        return await axios.post(`${api_url}auth/login`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        // console.error("Axios network error:", err?.response?.data?.message);
        if (err?.response?.data?.message === "Invalid credentials") {
          notifyError("Email or password is incorrect");
        } else {
          notifyError("Axios network error:", err?.response?.data?.message);
        }
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data?.data?.data);

      Cookies.set("album-token", data?.data?.data.access_token);
      Cookies.set("currentUser", data?.data?.data?.roles[0]);
      notifySuccess("Logged in successfully");

      switch (data?.data?.data?.user?.roles[0].name) {
        case ROLES.ADMIN:
          router.push("/admin");
          break;
        case ROLES.USER:
          router.push("/");
          break;
        default:
          break;
      }
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("form data: ", data);
    mutate(data);
  };

  return (
    <div className="login-page" style={{ "--bg-image": `url('/images/bg.jpg')` }}>
      <button
        className="button-primary"
        style={{
          position: "absolute",
          top: "2%",
          right: "1%",
          width: "10%",
          alignItems: "center",

        }}
        onClick={() => router.push("/home")}
      >
        <span style={{ marginButton: "2%" }}>

          <TiHome />
        </span>
        <span style={{ marginLeft: "5%" }}>
          Home

        </span>
      </button>
      <h2 className="mobile-title">Sign in</h2>
      <p className="mobile-description">Welcome back! Please enter your details.</p>
      <div className="login-from-wrap">
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <h1 className="site-title">
            <Link href="#">
              <Image

                src="/images/logo.png"
                alt="logo"
                width={100}
                height={50}
              />
            </Link>
          </h1>
          <h2>Sign in</h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>Welcome back! Please enter your details.</p>

          <AuthForm.TextController
            id="email"
            label="Email"
            errors={errors}
            register={register}
            name="email"
            icon="email"
          />

          <AuthForm.TextController
            id="password"
            label="Password"
            type="password"
            errors={errors}
            register={register}
            name="password"
            icon="lock"
          />

          <AuthForm.ButtonController isLoading={isLoading} type="submit">
            Sign in
          </AuthForm.ButtonController>

          <p className="swap-login-signup">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>

          <AuthForm.Divider />

          <AuthForm.GoogleButton />
        </AuthForm>
      </div>
    </div >
  );
}
