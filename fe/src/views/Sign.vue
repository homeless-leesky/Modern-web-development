<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="form.id"
                    label="Login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.pwd"
                    label="Password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                  <v-checkbox
                    v-model="form.remember"
                    label="Stay Signed in (최대 7일)"
                  ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="signIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        id: '',
        pwd: '',
        remember: false
      }
    }
  },
  methods: {
    signIn () {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then((r) => {
          if (!r.data.success) return console.error(r.data.msg)
          localStorage.setItem('token', r.data.token)
          this.$store.commit('getToken')
          this.$router.push('/')
        }).catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
