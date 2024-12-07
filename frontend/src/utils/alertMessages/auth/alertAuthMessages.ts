export class AuthAlertMessages {
  readonly lang = localStorage.getItem("lang");

  successLogin() {
    if (!!this.lang)
      return this.lang === "en"
        ? "Login successful. Enjoy your experience!"
        : "Başarıyla giriş yaptınız. Keyifli kullanımlar!";
    return "Başarıyla giriş yaptınız. Keyifli kullanımlar!";
  }

  successSignUp() {
    if (!!this.lang)
      return this.lang === "en"
        ? "Thank you for joining us! Enjoy your experience."
        : "Aramıza katıldığınız için teşekkür ederiz! Keyifli kullanımlar dileriz.";
    return "Aramıza katıldığınız için teşekkür ederiz! Keyifli kullanımlar dileriz.";
  }

  successLogout() {
    if (!!this.lang)
      return this.lang === "en" ? "Logging out..." : "Çıkış yapılıyor...";

    return "Çıkış yapılıyor...";
  }
}
