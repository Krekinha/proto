"use client";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const initialValues = {
  email: "dio@gmail.com",
  senha: "da191422",
};

const CredentialSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  senha: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .required("Campo obrigatório"),
});

export const BasicExample = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={CredentialSchema}
      onSubmit={(values, actions) => {
        /*setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 100);*/
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name="email"
          />
          {props.errors.email && <div id="feedback">{props.errors.email}</div>}
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.senha}
            name="senha"
          />
          <button className="bg-sky-200" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
