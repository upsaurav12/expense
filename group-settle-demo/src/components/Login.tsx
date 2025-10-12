import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";

type UserLogin = {
    email : string;
    password: string;
}

const Login = () => {

    const [email, setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const loginUser: UserLogin = {
            email: email,
            password: password,
        }

        try {
            const res = await axios.post("http://localhost:8080/login", loginUser)
            console.log("login succesfully: ", res)

            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
            }else {
                localStorage.setItem("token", "true");
            }
            navigate("/index")
        } catch (error) {
            console.error("error: ", error)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Welcome Back 👋
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            Login to manage your shared expenses
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-emerald-600 font-medium hover:underline">
              Sign up
            </a>
          </p>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600">
              ← Back to Home
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
