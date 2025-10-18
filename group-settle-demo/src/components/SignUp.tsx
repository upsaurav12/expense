import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


type User = {
    email : string;
    name: string;
    password: string;
}

const SignUp = () => {
    const [userName, setUserNaem] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string | "">("")
    const [password , setPassword] = useState<string | "">("")
    const navigate = useNavigate()

    const handleSignUp = async (e : React.FormEvent) => {
        e.preventDefault()

        const newUser : User = {
        email: userEmail,
        name: userName,
        password: password
        };

        try {
            const res = await axios.post("http://localhost:8080/signup" , newUser)
            console.log("response: ", res.data)
            navigate("/index")
        } catch (error) {
            console.error("error:", error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Create your SplitEasy account
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            It’s quick and easy — start splitting expenses now
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" className="mt-1" value={userName} onChange={(e) => setUserNaem(e.target.value)}/>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 font-medium hover:underline">
              Log in
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

export default SignUp;
