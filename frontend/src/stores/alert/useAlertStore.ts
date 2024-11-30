import { defineStore } from "pinia";

interface Props {
  title: string | undefined;
  text: string | undefined;
}

export const useAlertStore = defineStore("alert", {
  state: () => ({
    show: false as boolean,
    color: "success" as "success" | "info" | "warning" | "error",
    icon: "$sucess" as "$success" | "$info" | "$warning" | "$error",
    title: "" as string | undefined,
    text: "" as string | undefined,
  }),
  actions: {
    success(props: Props) {
      this.show = true;
      this.color = "success";
      this.icon = "$success";
      this.title = props.title;
      this.text = props.text;
    },
    info(props: Props) {
      this.show = true;
      this.color = "info";
      this.icon = "$info";
      this.title = props.title;
      this.text = props.text;
    },
    warning(props: Props) {
      this.show = true;
      this.color = "warning";
      this.icon = "$warning";
      this.title = props.title;
      this.text = props.text;
    },
    error(props: Props) {
      this.show = true;
      this.color = "error";
      this.icon = "$error";
      this.title = props.title;
      this.text = props.text;
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
