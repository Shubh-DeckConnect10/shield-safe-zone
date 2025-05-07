
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Must contain only numbers"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

const PhoneLoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: PhoneFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Store phone number and login status in localStorage
      localStorage.setItem("phoneNumber", `+91${data.phoneNumber}`);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("setupCompleted", "true");
      
      toast.success("Login successful!", {
        description: "Welcome to Shield Safe Zone",
      });
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      toast.error("Login failed", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-xl p-6 space-y-6 border">
        <div className="flex flex-col items-center space-y-2">
          <Shield className="h-16 w-16 text-primary" />
          <h1 className="text-2xl font-bold">Shield Safe Zone</h1>
          <p className="text-muted-foreground text-center">
            Register with your Indian phone number to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted flex items-center justify-center rounded-md px-3 h-10 text-sm">
                      +91
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter 10 digit number"
                        maxLength={10}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Register & Continue"}
            </Button>
          </form>
        </Form>
        
        <div className="text-xs text-center text-muted-foreground mt-6">
          By registering, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default PhoneLoginPage;
