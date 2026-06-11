<template>
  <div class="form">
    <LoadingPage :loading="loading" />
    <v-row justify="center" align="center">
      <v-col cols="10" sm="8" md="4" lg="4">
        <h1 class="text-center">Reading App</h1>
        <v-card class="mb-2" shaped outlined>
          <v-card-title v-text="formType" />
          <v-card-text>
            <v-text-field
              dense
              v-model="user.username"
              label="Username"
              type="text"
              required
              @keyup.enter="handleSubmit"
            />
            <v-text-field
              dense
              v-model="user.password"
              label="Password"
              type="password"
              required
              @keyup.enter="handleSubmit"
            />
            <v-text-field
              v-if="formType == 'Sign Up'"
              dense
              v-model="retype"
              label="Password Retype"
              type="password"
              required
              @keyup.enter="handleSubmit"
            />
          </v-card-text>
          <v-card-actions class="ma-2">
            <v-btn small :color="btnColor" @click="handleSubmit" :loading="loading">
              {{ formType }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mb-2" shaped outlined>
          <v-card-text>
            {{ formType == "Sign Up" ? "Already have an account?" : "Don't have an account?" }}
            <span
              :class="[
                'text-decoration-underline',
                'font-weight-bold',
                formType == 'Sign Up' ? 'primary--text' : 'success--text',
              ]"
              style="cursor: pointer;"
              @click.prevent="changeFormType"
              >{{ formType == "Sign Up" ? "Sign In" : "Sign Up" }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingPage from "../components/LoadingPage.vue";

export default {
  layout: "AuthLayout",
  components: {
    LoadingPage,
  },
  data: () => ({
    user: {
      username: "",
      password: "",
    },
    retype: "",
    formType: "Sign In",
    loading: false,
  }),
  computed: {
    btnColor() {
      return this.formType === "Sign Up" ? "success" : "primary";
    },
  },
  methods: {
    async handleSubmit() {
      if (this.formType === "Sign Up") {
        await this.signup();
      } else {
        await this.signin();
      }
    },
    changeFormType() {
      this.formType = this.formType === "Sign Up" ? "Sign In" : "Sign Up";
      this.user.username = "";
      this.user.password = "";
      this.retype = "";
    },
    async signin() {
      console.log(this.user)
      if (!this.user.username || !this.user.password) {
        this.$store.commit("snackbar/showMessage", {
          message: "Username and password are required.",
          color: "error",
        });
        return;
      }
      this.loading = true;
      try {
        console.log("Dispatching signin...", this.user);
        const data = await this.$store.dispatch("users/signin", this.user);
        console.log("Signin returned data:", data);
        if (data && data.user && (data.user.id || data.user._id)) {
          this.$store.commit("snackbar/showMessage", {
            message: "Sign In Successful!",
            color: "success",
          });
          this.$router.push("/home");
        } else {
          this.$store.commit("snackbar/showMessage", {
            message: data?.message || "Sign In Failed: Invalid response.",
            color: "error",
          });
        }
      } catch (err) {
        console.error("Caught error in signin catch block:", err);
        this.$store.commit("snackbar/showMessage", {
          message: err.message || "An unexpected error occurred",
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    async signup() {
      if (!this.user.username || !this.user.password) {
        this.$store.commit("snackbar/showMessage", {
          message: "Username and password are required.",
          color: "error",
        });
        return;
      }
      if (this.user.password !== this.retype) {
        this.$store.commit("snackbar/showMessage", {
          message: "Password and Retype must match!",
          color: "error",
        });
        return;
      }
      this.loading = true;
      try {
        const data = await this.$store.dispatch("users/signup", this.user);
        if (data && data.user && (data.user.id || data.user._id)) {
          this.$store.commit("snackbar/showMessage", {
            message: "Sign Up Successful!",
            color: "success",
          });
          await this.signin();
        } else {
          this.$store.commit("snackbar/showMessage", {
            message: data?.message || "Sign Up Failed: Invalid response.",
            color: "error",
          });
        }
      } catch (err) {
        // Errors handled globally
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.form {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
