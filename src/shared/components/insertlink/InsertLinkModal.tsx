import React, { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";

interface InsertLinkModalProps {
  onInsert: (url: string, displayText: string) => void;
  onCancel: () => void;
}

export const InsertLinkModal: React.FC<InsertLinkModalProps> = ({
  onInsert,
  onCancel,
}) => {
  const [webAddress, setWebAddress] = useState("");
  const [displayAs, setDisplayAs] = useState("");

  const handleWebAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWebAddress(newValue);

    // Sync displayAs only when they're currently equal
    if (webAddress === displayAs) {
      setDisplayAs(newValue);
    }
  };

  const handleDisplayAsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayAs(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (webAddress.trim()) {
      onInsert(webAddress, displayAs || webAddress);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="webAddress"
          className="block text-sm font-medium text-gray-700"
        >
          Web address (URL)
        </label>
        <Input
          id="webAddress"
          type="text"
          value={webAddress}
          onChange={handleWebAddressChange}
          placeholder="google.com"
          autoFocus
          fullWidth
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="displayAs"
          className="block text-sm font-medium text-gray-700"
        >
          Display as
        </label>
        <Input
          id="displayAs"
          type="text"
          value={displayAs}
          onChange={handleDisplayAsChange}
          placeholder="google.com"
          fullWidth
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button htmlType="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button htmlType="submit" type="primary" disabled={!webAddress.trim()}>
          OK
        </Button>
      </div>
    </form>
  );
};
