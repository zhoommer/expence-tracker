import { defineStore } from "pinia";

interface Props {
  title: string | undefined;
  text: string | undefined;
}

export const AlertStore = defineStore("alert", {
  state: () => ({
    show: false as boolean,
    color: "success" as "success" | "info" | "warning" | "error",
    icon: "$sucess" as "$success" | "$info" | "$warning" | "$error",
    title: "" as string | undefined,
    text: "" as string | undefined,
  }),
  actions: {
    async success(props: Props) {
      this.show = true;
      this.color = "success";
      this.icon = "$success";
      this.title = props.title;
      this.text = props.text;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.show = false;
    },
    async info(props: Props) {
      this.show = true;
      this.color = "info";
      this.icon = "$info";
      this.title = props.title;
      this.text = props.text;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.show = false;
    },
    async warning(props: Props) {
      this.show = true;
      this.color = "warning";
      this.icon = "$warning";
      this.title = props.title;
      this.text = props.text;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.show = false;
    },
    async error(props: Props) {
      this.show = true;
      this.color = "error";
      this.icon = "$error";
      this.title = props.title;
      this.text = props.text;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.show = false;
    },
    hideAlert() {
      this.show = false;
      this.color = "success";
      this.icon = "$success";
      this.title = "";
      this.text = "";
    },
  },
});
