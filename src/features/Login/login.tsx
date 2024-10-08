import { createEffect, createSignal, Setter } from "solid-js";
import SignInSide from "../SigninSide/signInSide";

interface IParams {
  setApiKey: Setter<string | undefined>;
}

export default (props: IParams) => {
  const [formApiKey, setFormApiKey] = createSignal<string>("");

  createEffect(() => {
    props.setApiKey(formApiKey);
  });

  return (
    <SignInSide setFormApiKey={setFormApiKey}></SignInSide>
  );
}