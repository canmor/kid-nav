"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bus, Train, Car, Check } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [selectedTransport, setSelectedTransport] = useState("car") // 默认选择自驾
  const [expandedItem, setExpandedItem] = useState("car") // 默认展开自驾
  const [busRoutes, setBusRoutes] = useState("")
  const [subwayLines, setSubwayLines] = useState("")

  // 当选择交通方式变化时，自动展开对应的卡片
  useEffect(() => {
    setExpandedItem(selectedTransport)
  }, [selectedTransport])

  const handleTransportSelect = (value) => {
    setSelectedTransport(value)
    // 自动展开选中的项
    setExpandedItem(value)
  }

  const handleSave = () => {
    // 创建设置对象
    const settings = {
      selectedTransport,
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
          <RadioGroup value={selectedTransport} onValueChange={handleTransportSelect} className="space-y-4">
            <Accordion type="single" value={expandedItem} onValueChange={setExpandedItem} className="w-full">
              <AccordionItem
                value="car"
                className={`rounded-lg border ${selectedTransport === "car" ? "border-primary bg-primary/5" : "border-muted"}`}
              >
                <div className="flex items-center">
                  <RadioGroupItem value="car" id="car" className="sr-only" />
                  <Label
                    htmlFor="car"
                    className="flex items-center justify-between w-full cursor-pointer p-4"
                    onClick={() => handleTransportSelect("car")}
                  >
                    <div className="flex items-center space-x-3">
                      <Car
                        className={`h-5 w-5 ${selectedTransport === "car" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className={selectedTransport === "car" ? "font-medium" : ""}>自驾</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedTransport === "car" && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <AccordionTrigger className="p-0" onClick={(e) => e.stopPropagation()} />
                    </div>
                  </Label>
                </div>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-sm text-muted-foreground">自驾模式无需额外设置</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="bus"
                className={`rounded-lg border ${selectedTransport === "bus" ? "border-primary bg-primary/5" : "border-muted"}`}
              >
                <div className="flex items-center">
                  <RadioGroupItem value="bus" id="bus" className="sr-only" />
                  <Label
                    htmlFor="bus"
                    className="flex items-center justify-between w-full cursor-pointer p-4"
                    onClick={() => handleTransportSelect("bus")}
                  >
                    <div className="flex items-center space-x-3">
                      <Bus
                        className={`h-5 w-5 ${selectedTransport === "bus" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className={selectedTransport === "bus" ? "font-medium" : ""}>公交车</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedTransport === "bus" && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <AccordionTrigger className="p-0" onClick={(e) => e.stopPropagation()} />
                    </div>
                  </Label>
                </div>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="busRoutes" className="text-sm">
                      输入公交线路（用逗号分隔）
                    </Label>
                    <Input
                      id="busRoutes"
                      placeholder="例如: 322, m13, 快线1号"
                      value={busRoutes}
                      onChange={(e) => setBusRoutes(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">这些线路将作为"可用"的公交线路显示</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="subway"
                className={`rounded-lg border ${selectedTransport === "subway" ? "border-primary bg-primary/5" : "border-muted"}`}
              >
                <div className="flex items-center">
                  <RadioGroupItem value="subway" id="subway" className="sr-only" />
                  <Label
                    htmlFor="subway"
                    className="flex items-center justify-between w-full cursor-pointer p-4"
                    onClick={() => handleTransportSelect("subway")}
                  >
                    <div className="flex items-center space-x-3">
                      <Train
                        className={`h-5 w-5 ${selectedTransport === "subway" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className={selectedTransport === "subway" ? "font-medium" : ""}>地铁</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedTransport === "subway" && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <AccordionTrigger className="p-0" onClick={(e) => e.stopPropagation()} />
                    </div>
                  </Label>
                </div>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="subwayLines" className="text-sm">
                      输入地铁线路（用逗号分隔）
                    </Label>
                    <Input
                      id="subwayLines"
                      placeholder="例如: 1号线, 4号线, 13号线"
                      value={subwayLines}
                      onChange={(e) => setSubwayLines(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">这些线路将作为"可用"的地铁线路显示</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </RadioGroup>
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

