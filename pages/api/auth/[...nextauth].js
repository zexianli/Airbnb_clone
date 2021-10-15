import NextAuth from "next-auth";
import Provider from "next-auth/providers"

const options = {
    providers: [
        Provider.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Provider.Facebook({
            clientId: "",
            clientSecret: ""
        })
    ],
}

export default (req, res) => NextAuth(req, res, options);