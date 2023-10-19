"use client";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { ILogin } from "@/utils/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Backbar from "@/app/(withMenu)/layout/Backbar";

const initialValues = {
  /*email: "dio@gmail.com",
  senha: "da191475",*/
  email: "",
  senha: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  senha: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .required("Campo obrigatório"),
});

export default function Login() {
  const [message, setMessage] = useState({ text: "" });
  const router = useRouter();

  const handleSubmit = async (dados: ILogin) => {
    const resp = await signIn("credentials", {
      redirect: false,
      email: dados.email,
      senha: dados.senha,
    });

    console.log(resp);

    if (resp!.ok == true) {
      console.log(resp);
      router.push("/");
    } else {
      setMessage({ text: resp?.error || "erro?" });
      console.log(resp);
    }
  };

  return (
    <>
      <div>
        <div className="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12">
          <div className="mx-auto dark">
            <Backbar url="/" />
            <div className="mt-3">
              <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                  Faça login na sua conta
                </div>
                <div className="mt-8">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={async (values: ILogin, actions) => {
                      handleSubmit(values);
                    }}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <div className="flex flex-col mb-2">
                          <div className="flex relative ">
                            <div>
                              <div className="flex relative">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                  <svg
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                  </svg>
                                </span>
                                <Field
                                  type="text"
                                  name="email"
                                  value={props.values.email}
                                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  placeholder="Seu email"
                                />
                              </div>
                              {props.touched.email && props.errors.email && (
                                <span className="text-[0.75rem] text-red-500">
                                  {props.errors.email}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mb-6">
                          <div className="flex relative ">
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                              </svg>
                            </span>
                            <Field
                              type="text"
                              name="senha"
                              value={props.values.senha}
                              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                              placeholder="Sua senha"
                            />
                          </div>
                          <div>
                            {props.touched.senha && props.errors.senha && (
                              <span className="text-[0.75rem] text-red-500">
                                {props.errors.senha}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                          <div className="flex ml-auto">
                            <a
                              href="#"
                              className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                            >
                              Esqueceu sua senha?
                            </a>
                          </div>
                        </div>
                        <div className="flex-coç w-full">
                          <button
                            type="submit"
                            className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Login
                          </button>
                          <div className="flex justify-center mt-1">
                            <span className="text-[0.75rem] text-red-500">
                              {message.text}
                            </span>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="flex items-center justify-center mt-6">
                  <a
                    href="#"
                    target="_blank"
                    className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                  >
                    <span className="ml-2">Você não tem uma conta?</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
