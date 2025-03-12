"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Bus, Train, Car } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [transportOptions, setTransportOptions] = useState({
    bus: true,
    subway: true,
    car: true,
  })

  const [busRoutes, setBusRoutes] = useState("")
  const [subwayLines, setSubwayLines] = useState("")

  const handleToggle = (option) => {
    setTransportOptions({
      ...transportOptions,
      [option]: !transportOptions[option],
    })
  }

  const handleSave = () => {
    // In a real app, we would save this to localStorage or a backend
    const settings = {
      transportOptions,
      busRoutes: busRoutes.split(",").map((route) => route.trim()),
      subwayLines: subwayLines.split(",").map((line) => line.trim()),
    }

    localStorage.setItem("travelSettings", JSON.stringify(settings))
    router.push("/main")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">设置出行选项</CardTitle>
          <CardDescription>选择您希望应用显示的交通工具</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-primary" />
                <Label htmlFor="bus" className="font-medium">
                  公交车
                </Label>
              </div>
              <Switch id="bus" checked={transportOptions.bus} onCheckedChange={() => handleToggle("bus")} />
            </div>

            {transportOptions.bus && (
              <div className="pl-7 space-y-2">
                <Label htmlFor="busRoutes" className="text-sm">
                  输入公交线路（用逗号分隔）
                </Label>
                <Input
                  id="busRoutes"
                  placeholder="例如: 322, m13, 快线1号"
                  value={busRoutes}
                  onChange={(e) => setBusRoutes(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Train className="h-5 w-5 text-primary" />
                <Label htmlFor="subway" className="font-medium">
                  地铁
                </Label>
              </div>
              <Switch id="subway" checked={transportOptions.subway} onCheckedChange={() => handleToggle("subway")} />
            </div>

            {transportOptions.subway && (
              <div className="pl-7 space-y-2">
                <Label htmlFor="subwayLines" className="text-sm">
                  输入地铁线路（用逗号分隔）
                </Label>
                <Input
                  id="subwayLines"
                  placeholder="例如: 1号线, 4号线, 13号线"
                  value={subwayLines}
                  onChange={(e) => setSubwayLines(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-primary" />
                <Label htmlFor="car" className="font-medium">
                  自驾
                </Label>
              </div>
              <Switch id="car" checked={transportOptions.car} onCheckedChange={() => handleToggle("car")} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSave}>
            保存并继续
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

