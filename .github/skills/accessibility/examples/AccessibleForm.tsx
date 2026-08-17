import { useId, useState, type ChangeEvent, type FormEvent } from "react";

type FormValues = {
  email: string;
  password: string;
};

export function AccessibleFormExample() {
  const emailId = useId();
  const passwordId = useId();
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address, such as name@example.com.";
    }

    if (!values.password) {
      nextErrors.password = "Please enter your password.";
    } else if (values.password.length < 8) {
      nextErrors.password = "Your password must be at least 8 characters long.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("Please correct the highlighted fields.");
      return;
    }

    setStatusMessage("Signed in successfully.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="login-title">
      <h2 id="login-title">Sign in</h2>

      <div>
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          placeholder="name@example.com"
        />
        {errors.email ? (
          <p id={`${emailId}-error`} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={passwordId}>Password</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
          placeholder="At least 8 characters"
        />
        {errors.password ? (
          <p id={`${passwordId}-error`} role="alert">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button type="submit">Sign in</button>

      {statusMessage ? (
        <p aria-live="polite" role="status">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
