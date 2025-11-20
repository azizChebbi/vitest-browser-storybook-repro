import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Example/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch");

    // Test that toggle exists and is unchecked
    await expect(toggle).toBeInTheDocument();
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    // Test clicking the toggle
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");

    // Test clicking again to turn off
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "false");
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: "Pre-enabled toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch");

    await expect(toggle).toHaveAttribute("aria-checked", "true");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch");

    // Test that toggle is not focusable when disabled
    await expect(toggle).toHaveAttribute("tabindex", "-1");
  },
};

export const KeyboardInteraction: Story = {
  args: {
    label: "Keyboard accessible",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch");

    // Test keyboard interaction
    toggle.focus();
    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
  },
};
