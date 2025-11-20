import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Radio } from "./Radio";

const sampleOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const meta: Meta<typeof Radio> = {
  title: "Example/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "size",
    options: sampleOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    // Test that all radio buttons exist
    await expect(radios).toHaveLength(3);

    // Test selecting the medium option
    const mediumRadio = canvas.getByRole("radio", { name: /medium/i });
    await userEvent.click(mediumRadio);
    await expect(mediumRadio).toBeChecked();

    // Test that other options are not checked
    const smallRadio = canvas.getByRole("radio", { name: /small/i });
    const largeRadio = canvas.getByRole("radio", { name: /large/i });
    await expect(smallRadio).not.toBeChecked();
    await expect(largeRadio).not.toBeChecked();
  },
};

export const WithValue: Story = {
  args: {
    name: "size-preset",
    options: sampleOptions,
    value: "large",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const largeRadio = canvas.getByRole("radio", { name: /large/i });

    await expect(largeRadio).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    name: "size-disabled",
    options: sampleOptions,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    // Test that all radio buttons are disabled
    for (const radio of radios) {
      await expect(radio).toBeDisabled();
    }
  },
};
