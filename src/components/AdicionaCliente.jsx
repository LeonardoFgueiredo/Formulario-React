import React from "react";
import { Formik, useField } from "formik";
import * as yup from "yup";

const Campo = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? "is-invalid" : ""}
      />
      {meta.error && meta.touched ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

const AdicionaCliente = () => {
  const esquema = yup.object({
    nome: yup
      .string()
      .required("O nome é obrigatório")
      .min(5, "O nome deve ter no mínimo 5 caracteres")
      .max(10, "O nome deve no maximo 10 caracteres"),
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("O email é inválido"),
    nascimento: yup.date()
      .required("A data de nascimento é obrigatória")
      .max(new Date(), "Você não pode ter nascido no futuro"),
  });

  return (
    <>
      <h1>Cadastro de Clientes</h1>

      <Formik
       validationSchema={esquema}
        initialValues={{ nome: "", email: "", nascimento: "" }}
        onSubmit={(values) => {alert(JSON.stringify(values))}}
      >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <Campo id="nome" name="nome" type="text" label="Nome:" />

            <Campo id="email" name="email" type="email" label="Email:" />

            <Campo
              id="nascimento"
              name="nascimento"
              type="date"
              label="Data de Nascimento:"
            />

            <button type="submit">Adicionar</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AdicionaCliente;
