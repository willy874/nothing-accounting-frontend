import Title from "./Title";
import Content from "./Content";
import { useState } from "react";
import Button from "@/components/Button";

export function Dialog({ onCancel }) {
  const [dialog, setDialog] = useState({
    title: "",
    content: "",
    confirm: false,
  });

  return (
    <div className="min-w-screen dialog-box">
      <div className="dialog-content relative">
        <Title message={dialog.title} />
        <Content message={dialog.content} />
        <Button text="cancel" onClick={onCancel} />
        {dialog.confirm && <Button text="delete" onClick={onCancel} />}
      </div>
    </div>
  );
}
