import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Example/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");

    // Test that textarea exists
    await expect(textarea).toBeInTheDocument();

    // Test typing in the textarea
    await userEvent.type(textarea, "This is a multi-line\ntext area example");
    await expect(textarea).toHaveValue(
      "This is a multi-line\ntext area example"
    );
  },
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 50,
    placeholder: "Maximum 50 characters...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");

    await userEvent.type(textarea, "Short text");
    await expect(textarea).toHaveValue("Short text");

    // Check character counter
    const counter = canvas.getByText("10/50");
    await expect(counter).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "This textarea is disabled",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");

    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveValue("This textarea is disabled");
  },
};
