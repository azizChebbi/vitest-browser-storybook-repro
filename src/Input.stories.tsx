import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // Test that input exists
    await expect(input).toBeInTheDocument();

    // Test typing in the input
    await userEvent.type(input, "Hello World");
    await expect(input).toHaveValue("Hello World");
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Type something...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type something...");

    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "Test");
    await expect(input).toHaveValue("Test");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toBeDisabled();
  },
};
