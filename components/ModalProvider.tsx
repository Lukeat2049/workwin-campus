"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import RequestModal from "./RequestModal";

interface ModalContextValue {
  /** Open the shared request modal with an optional pre-filled subject. */
  openModal: (subject?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useRequestModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useRequestModal must be used within ModalProvider");
  }
  return ctx;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string>("");

  const openModal = (s = "") => {
    setSubject(s);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <RequestModal open={open} onClose={closeModal} subject={subject} />
    </ModalContext.Provider>
  );
}
