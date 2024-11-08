/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VCalendar } from "vuetify/labs/VCalendar";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    colors: {
      primary: "#B9B7A7",
      secondary: "#8E24AA",
      accent: "#FFC107",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  },
  components: {
    VCalendar,
  },
});
