import { Button, ButtonVariants } from "./ui/button";
import { useState } from "react";

export function App() {
  const [text, setText] = useState("");
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Button variant={ButtonVariants.default}>{text}</Button>
      <Button variant={ButtonVariants.default}>{text}</Button>
      <Button variant={ButtonVariants.default}>{text}</Button>
      <Button variant={ButtonVariants.default}>{text}</Button>
    </div>
  );
}
