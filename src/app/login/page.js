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
      Cookies.set("currentUser", data?.data?.data?.user);
      notifySuccess("Logged in successfully");

      switch (data?.data?.data?.user?.roles[0].name) {
        case ROLES.ADMIN:
          router.push("/admin");
          break;
        case ROLES.USER:
          router.push("/home");
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
    <div className="login-page" style={{ backgroundImage: `url('/bg.jpg')` }}>
      <button
        className="button-primary"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          margin: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
        onClick={() => router.push("/home")}
      >
        <TiHome />
        Home
      </button>
      <div className="login-from-wrap">
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <h1 className="site-title">
            <Link href="#">
              <Image src="/logo.png" alt="logo" width={100} height={50} />
            </Link>
          </h1>

          <AuthForm.TextController
            id="email"
            label="Email"
            errors={errors}
            register={register}
            name="email"
          />

          <AuthForm.TextController
            id="password"
            label="Password"
            type="password"
            errors={errors}
            register={register}
            name="password"
          />

          <AuthForm.ButtonController isLoading={isLoading} type="submit">
            Login
          </AuthForm.ButtonController>

          <p className="swap-login-signup">
            Don't have an account? <Link href="/signup">Register</Link>.
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
