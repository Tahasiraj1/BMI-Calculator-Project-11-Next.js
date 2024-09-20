"use client";

import { useState, ChangeEvent } from "react";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BmiResult {
    bmi: string;
    category: string;
}

export default function BmiCalculator() {
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [result, setResult] = useState<BmiResult | null>(null);
    const [error, setError] = useState<string>("");

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setHeight(e.target.value);
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setWeight(e.target.value)
    };

    const calculateBmi = (): void => {
        if (!height || !weight) {
            setError("Please enter both height and weight.");
            return;
        }

        const heightInMeters = parseFloat(height) / 100;
        if (heightInMeters <= 0) {
            setError("Height must be a positive number.");
            return;
        }

        const weightInKg = parseFloat(weight);
        if (weightInKg <= 0) {
            setError("Weight must be a positive number.");
            return;
        }

        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        let category = "";
        if (bmiValue < 18.5) {
            category = "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            category = "Normal";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            category = "Overweight";
        } else {
            category = "Obese";
        }
        setResult({ bmi: bmiValue.toFixed(1), category });
        setError("");
    };

    const reset = (): void => {
        setResult(null);
        setHeight("");
        setWeight("");
    }

    return (
        <div className="flex flex-col item-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8"
        style={{
            backgroundImage: `url('/bmi.png')`,
            backgroundPosition: 'center',
            backgroundSize: "cover"
        }}
        >
            <Card className="w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 via-cyan-100 to-pink-100">
                <CardHeader>
                    <CardTitle>BMI Calculator</CardTitle>
                    <CardDescription>
                        Enter your height and weight to calculate your BMI.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                        className="rounded-3xl border-2 border-gray-400"
                        id="height"
                        type="number"
                        placeholder="Enter your height"
                        value={height}
                        onChange={handleHeightChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                        className="rounded-3xl border-2 border-gray-400"
                        id="weight"
                        type="number"
                        placeholder="Enter your weight"
                        value={weight}
                        onChange={handleWeightChange}
                        />
                    </div>
                    <div className="flex justify-center space-x-32">
                    <Button
                    className="w-24 rounded-3xl active:scale-95 transition-transform duration-100 active:bg-gray-900"
                    onClick={calculateBmi}
                    >
                        Calculate
                    </Button>
                    <Button
                    className="w-24 rounded-3xl active:scale-95 transition-transform duration-100 active:bg-gray-900"
                    onClick={reset}
                    >
                        Reset
                    </Button>
                    </div>
                    {error && 
                    <div className="text-red-500 text-center">{error}</div>
                    }
                    {result && (
                        <div className="grid gap-2 animate-in zoom-in duration-500">
                            <div className="text-center text-2xl font-bold">{result.bmi}</div>
                            <div className="text-center text-muted-foreground">
                                {result.category}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
