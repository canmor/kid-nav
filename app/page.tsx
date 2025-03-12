"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">出行小助手</CardTitle>
          <CardDescription>帮助家长轻松应对孩子的出行小脾气</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-xs">
            <img
              src="/placeholder.svg?height=200&width=300"
              alt="孩子和家长出行插图"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-lg font-medium">轻松应对孩子出行执着</h2>
            <p className="text-sm text-muted-foreground">通过模拟出行选择和提供"合理"的借口，帮助转移孩子注意力</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={() => router.push("/setup")}>
            开始使用
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

