"use client";
import { useState } from "react";
import Button from "../Button";
import InquireForm from "../AllForms/InquireForm";
import CalculatorForm from "../AllForms/CalculatorForm";
import CommonModal from "../Modal/CommonModal";
interface FormButtonProps {
  btnTxt: string;
  className?: string;
}

export function FormButton1({ btnTxt, className }: FormButtonProps) {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        className={
          "inline-flex items-center gap-3 hover:bg-primaryL text-white px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        }
        onClick={() => setShowInquiry(true)}
      >
        {btnTxt}
      </Button>
      <InquireForm open={showInquiry} onClose={() => setShowInquiry(false)} />
    </>
  );
}

export function FormButton2({ btnTxt, className }: FormButtonProps) {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <>
      <Button
        variant="white"
        className={
          "inline-flex items-center gap-3 hover:bg-primary text-white px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        }
        onClick={() => setShowInquiry(true)}
      >
        {btnTxt}
      </Button>
      <CommonModal isOpen={showInquiry} onClose={() => setShowInquiry(false)}
        header={'Find Your Ideal Property by Budget'}
        >
        <CalculatorForm />
      </CommonModal>
    </>
  );
}
