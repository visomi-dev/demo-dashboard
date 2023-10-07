import { createSignal, type Component } from 'solid-js';
import { Link, useNavigate } from '@solidjs/router';
import { createFormControl, createFormGroup } from 'solid-forms';
import { As } from '@kobalte/core';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card';
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '@/client/components/ui/textfield';
import { Button } from '@/client/components/ui/button';

import { useAuth } from '../../stores/auth';
import { DASHBOARD_PATH, SIGN_IN_PATH } from '../../constants/routes';

const SignUp: Component = () => {
  const navigate = useNavigate();

  const [error, setError] = createSignal<string | null>(null);

  const auth = useAuth();

  const form = createFormGroup({
    email: createFormControl('', {
      required: true,
    }),
    password: createFormControl('', {
      required: true,
    }),
  });

  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    const { email, password } = form.value;

    if (!email || !password) return;

    auth.actions
      .signUp(email, password)
      .then(() => {
        navigate(DASHBOARD_PATH);
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  };

  return (
    <div class="w-full max-w-sm p-8">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="sign-up" class="flex flex-col gap-4" onSubmit={onSubmit}>
            <div class="flex flex-col gap-1">
              <TextField class="flex flex-col gap-1.5">
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  type="email"
                  placeholder="Email"
                  value={form.controls.email.value}
                  onInput={(e: Event) => {
                    form.controls.email.setValue(
                      (e.target as HTMLInputElement).value,
                    );
                  }}
                  required
                />
              </TextField>
            </div>

            <div class="flex flex-col gap-1">
              <TextField class="flex flex-col gap-1.5">
                <TextFieldLabel>Password</TextFieldLabel>
                <TextFieldInput
                  type="password"
                  placeholder="Password"
                  value={form.controls.password.value}
                  onInput={(e: Event) => {
                    form.controls.password.setValue(
                      (e.target as HTMLInputElement).value,
                    );
                  }}
                  required
                />
              </TextField>
            </div>

            {error() && <p class="text-center text-red-400">{error()}</p>}
          </form>
        </CardContent>

        <CardFooter class="flex flex-col gap-4">
          <Button
            type="submit"
            form="sign-up"
            class="w-full"
            disabled={auth.state.loading}
          >
            Sign Up
          </Button>

          <Button variant="link" class="w-full" asChild>
            <As component={Link} href={SIGN_IN_PATH}>
              Sign In
            </As>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
