"use client";

import ConfirmModal from "../ui/confirm-modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteLeadModal({ open, onClose, onConfirm }: Props) {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Lead"
      message="Are you sure? All associated follow-ups and data will be permanently deleted."
      confirmText="Delete Lead"
      variant="danger"
    />
  );
}
