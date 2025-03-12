"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bus, Train, Car, MapPin, AlertTriangle } from "lucide-react"

const commonDestinations = ["幼儿园", "公园", "超市", "游乐场", "奶奶家", "图书馆"]

// 借口生成器
const excuses = {
  bus: [
    "这条公交线路今天临时停运了。",
    "公交车正在进行消毒，暂时不发车。",
    "司机叔叔说公交车去加油了。",
    "这条线路今天改道了，不经过我们要去的地方。",
  ],
  subway: [
    "地铁站正在维修。",
    "地铁今天人太多了，我们换个方式吧。",
    "这条地铁线今天有延误。",
    "地铁站电梯坏了，我们换个方式吧。",
  ],
  car: ["汽车正在充电。", "爸爸/妈妈忘记带车钥匙了。", "我们的车今天要去做保养。", "停车场今天没有空位了。"],
}

export default function MainPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [settings, setSettings] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [generatedExcuses, setGeneratedExcuses] = useState({})

  useEffect(() => {
    // 从localStorage加载设置
    const savedSettings = localStorage.getItem("travelSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    } else {
      // 如果没有设置，返回到设置页面
      router.push("/setup")
    }
  }, [router])

  const handlePlanRoute = () => {
    if (!destination) return

    // 为每种未选择的交通方式生成借口
    const newExcuses = {}

    if (settings) {
      Object.keys(settings.transportOptions).forEach((option) => {
        if (settings.transportOptions[option]) {
          // 随机决定这个选项是否可用
          const isAvailable = Math.random() > 0.3

          if (!isAvailable) {
            const randomIndex = Math.floor(Math.random() * excuses[option].length)
            newExcuses[option] = excuses[option][randomIndex]
          }
        }
      })
    }

    setGeneratedExcuses(newExcuses)
    setShowResults(true)
  }

  const getRandomRoute = (routes) => {
    if (!routes || routes.length === 0) return "随机线路"
    const randomIndex = Math.floor(Math.random() * routes.length)
    return routes[randomIndex]
  }

  const handleSelectDestination = (dest) => {
    setDestination(dest)
  }

  const handleReset = () => {
    setShowResults(false)
    setDestination("")
  }

  if (!settings) {
    return <div className="container max-w-md mx-auto px-4 py-8">加载中...</div>
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">出行规划</CardTitle>
          <CardDescription>{showResults ? `前往: ${destination}` : "输入您想要去的地方"}</CardDescription>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">目的地</Label>
                <div className="flex space-x-2">
                  <Input
                    id="destination"
                    placeholder="输入目的地"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>快速选择</Label>
                <div className="flex flex-wrap gap-2">
                  {commonDestinations.map((dest) => (
                    <Button key={dest} variant="outline" size="sm" onClick={() => handleSelectDestination(dest)}>
                      {dest}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cartoon Satellite Map Visualization */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden border mb-4">
                <div className="absolute inset-0">
                  {/* Cartoon Satellite Map Background SVG */}
                  <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
                    {/* Base background */}
                    <rect x="0" y="0" width="400" height="300" fill="#e2e8f0" />

                    {/* Water bodies */}
                    <path d="M0,50 C50,60 100,40 150,50 L150,0 L0,0 Z" fill="#93c5fd" />
                    <ellipse cx="300" cy="200" rx="80" ry="50" fill="#93c5fd" />

                    {/* Parks and green spaces */}
                    <rect x="50" y="100" width="80" height="60" rx="10" fill="#86efac" />
                    <circle cx="90" cy="130" r="25" fill="#4ade80" />
                    <circle cx="70" cy="110" r="10" fill="#4ade80" />
                    <circle cx="110" cy="150" r="15" fill="#4ade80" />

                    <rect x="250" y="50" width="100" height="70" rx="10" fill="#86efac" />
                    <circle cx="280" cy="70" r="15" fill="#4ade80" />
                    <circle cx="310" cy="90" r="20" fill="#4ade80" />
                    <circle cx="330" cy="60" r="10" fill="#4ade80" />

                    {/* Residential areas */}
                    <rect x="20" y="200" width="120" height="80" rx="5" fill="#fecaca" />
                    <rect x="30" y="210" width="20" height="20" fill="#fca5a5" />
                    <rect x="60" y="210" width="20" height="20" fill="#fca5a5" />
                    <rect x="90" y="210" width="20" height="20" fill="#fca5a5" />
                    <rect x="30" y="240" width="20" height="20" fill="#fca5a5" />
                    <rect x="60" y="240" width="20" height="20" fill="#fca5a5" />
                    <rect x="90" y="240" width="20" height="20" fill="#fca5a5" />

                    <rect x="200" y="230" width="150" height="60" rx="5" fill="#fecaca" />
                    <rect x="210" y="240" width="15" height="15" fill="#fca5a5" />
                    <rect x="235" y="240" width="15" height="15" fill="#fca5a5" />
                    <rect x="260" y="240" width="15" height="15" fill="#fca5a5" />
                    <rect x="285" y="240" width="15" height="15" fill="#fca5a5" />
                    <rect x="310" y="240" width="15" height="15" fill="#fca5a5" />
                    <rect x="210" y="265" width="15" height="15" fill="#fca5a5" />
                    <rect x="235" y="265" width="15" height="15" fill="#fca5a5" />
                    <rect x="260" y="265" width="15" height="15" fill="#fca5a5" />
                    <rect x="285" y="265" width="15" height="15" fill="#fca5a5" />
                    <rect x="310" y="265" width="15" height="15" fill="#fca5a5" />

                    {/* Commercial/shopping areas */}
                    <rect x="170" y="100" width="60" height="100" rx="5" fill="#bfdbfe" />
                    <rect x="180" y="110" width="40" height="20" fill="#93c5fd" />
                    <rect x="180" y="140" width="40" height="20" fill="#93c5fd" />
                    <rect x="180" y="170" width="40" height="20" fill="#93c5fd" />

                    {/* Main roads */}
                    <path d="M0,180 L400,180" stroke="#94a3b8" strokeWidth="10" fill="none" />
                    <path d="M200,0 L200,300" stroke="#94a3b8" strokeWidth="10" fill="none" />

                    {/* Secondary roads */}
                    <path d="M100,0 L100,300" stroke="#94a3b8" strokeWidth="5" fill="none" />
                    <path d="M300,0 L300,300" stroke="#94a3b8" strokeWidth="5" fill="none" />
                    <path d="M0,80 L400,80" stroke="#94a3b8" strokeWidth="5" fill="none" />
                    <path d="M0,280 L400,280" stroke="#94a3b8" strokeWidth="5" fill="none" />

                    {/* Road markings */}
                    <path d="M0,180 L400,180" stroke="white" strokeWidth="2" strokeDasharray="10,10" fill="none" />
                    <path d="M200,0 L200,300" stroke="white" strokeWidth="2" strokeDasharray="10,10" fill="none" />

                    {/* Small paths */}
                    <path d="M50,100 L50,180" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                    <path d="M130,100 L130,180" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                    <path d="M250,50 L250,180" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                    <path d="M350,50 L350,180" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                    <path d="M170,140 L200,140" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                    <path d="M230,140 L300,140" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                  </svg>

                  {/* Start point */}
                  <div className="absolute top-1/2 left-6 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 z-10"></div>

                  {/* Destination point */}
                  <div className="absolute top-1/2 right-6 w-4 h-4 bg-red-500 rounded-full transform -translate-y-1/2 z-10">
                    <MapPin className="h-6 w-6 text-red-500 absolute -top-6 -left-1" />
                  </div>

                  {/* Route lines for different transportation - now with curves and icons */}
                  {settings.transportOptions.bus && !generatedExcuses.bus && (
                    <div className="absolute top-1/3 left-0 right-0 h-20 z-20">
                      <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path
                          d="M30,20 C100,0 150,60 200,30 C250,0 300,50 370,20"
                          stroke="#3b82f6"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="8,8"
                        />
                      </svg>
                      {/* Bus icons along the route */}
                      <div className="absolute top-0 left-1/4 bg-white rounded-full p-1 shadow-md">
                        <Bus className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="absolute top-1/4 left-2/4 bg-white rounded-full p-1 shadow-md">
                        <Bus className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  )}

                  {settings.transportOptions.subway && !generatedExcuses.subway && (
                    <div className="absolute top-1/2 left-0 right-0 h-20 z-20">
                      <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path
                          d="M30,40 C120,70 180,10 250,40 C320,70 350,30 370,40"
                          stroke="#8b5cf6"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                      {/* Subway icons along the route */}
                      <div className="absolute top-1/4 left-1/3 bg-white rounded-full p-1 shadow-md">
                        <Train className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="absolute top-0 left-3/5 bg-white rounded-full p-1 shadow-md">
                        <Train className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  )}

                  {settings.transportOptions.car && !generatedExcuses.car && (
                    <div className="absolute top-2/3 left-0 right-0 h-20 z-20">
                      <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path
                          d="M30,60 C80,20 150,80 250,20 C350,60 350,40 370,60"
                          stroke="#10b981"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                      {/* Car icons along the route */}
                      <div className="absolute top-0 left-2/5 bg-white rounded-full p-1 shadow-md">
                        <Car className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div className="absolute top-1/4 right-1/4 bg-white rounded-full p-1 shadow-md">
                        <Car className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>
                  )}

                  {/* Unavailable transportation indicators */}
                  {settings.transportOptions.bus && generatedExcuses.bus && (
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-lg p-2 shadow-md border border-yellow-300 flex items-center space-x-2 max-w-[80%] z-30">
                      <div className="flex-shrink-0">
                        <Bus className="h-8 w-8 text-gray-400" />
                        <AlertTriangle className="h-5 w-5 text-yellow-600 absolute -top-1 -right-1" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{generatedExcuses.bus}</p>
                    </div>
                  )}

                  {settings.transportOptions.subway && generatedExcuses.subway && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-lg p-2 shadow-md border border-yellow-300 flex items-center space-x-2 max-w-[80%] z-30">
                      <div className="flex-shrink-0">
                        <Train className="h-8 w-8 text-gray-400" />
                        <AlertTriangle className="h-5 w-5 text-yellow-600 absolute -top-1 -right-1" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{generatedExcuses.subway}</p>
                    </div>
                  )}

                  {settings.transportOptions.car && generatedExcuses.car && (
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white/90 rounded-lg p-2 shadow-md border border-yellow-300 flex items-center space-x-2 max-w-[80%] z-30">
                      <div className="flex-shrink-0">
                        <Car className="h-8 w-8 text-gray-400" />
                        <AlertTriangle className="h-5 w-5 text-yellow-600 absolute -top-1 -right-1" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{generatedExcuses.car}</p>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/80 p-2 rounded text-xs flex flex-wrap gap-x-3 gap-y-1 z-30">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      <span>当前位置</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      <span>{destination}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-center mb-4">可选的出行方式</h3>

              {settings.transportOptions.bus && (
                <div className={`p-4 rounded-lg border ${generatedExcuses.bus ? "bg-muted/50" : "bg-primary/5"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bus className={`h-8 w-8 ${generatedExcuses.bus ? "text-muted-foreground" : "text-primary"}`} />
                      <div>
                        <p className="font-medium">公交车</p>
                        {!generatedExcuses.bus && (
                          <p className="text-sm text-muted-foreground">{getRandomRoute(settings.busRoutes)}路</p>
                        )}
                      </div>
                    </div>

                    {generatedExcuses.bus && (
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                      </div>
                    )}
                  </div>

                  {generatedExcuses.bus && (
                    <div className="mt-2 text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                      {generatedExcuses.bus}
                    </div>
                  )}
                </div>
              )}

              {settings.transportOptions.subway && (
                <div className={`p-4 rounded-lg border ${generatedExcuses.subway ? "bg-muted/50" : "bg-primary/5"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Train
                        className={`h-8 w-8 ${generatedExcuses.subway ? "text-muted-foreground" : "text-primary"}`}
                      />
                      <div>
                        <p className="font-medium">地铁</p>
                        {!generatedExcuses.subway && (
                          <p className="text-sm text-muted-foreground">{getRandomRoute(settings.subwayLines)}</p>
                        )}
                      </div>
                    </div>

                    {generatedExcuses.subway && (
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                      </div>
                    )}
                  </div>

                  {generatedExcuses.subway && (
                    <div className="mt-2 text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                      {generatedExcuses.subway}
                    </div>
                  )}
                </div>
              )}

              {settings.transportOptions.car && (
                <div className={`p-4 rounded-lg border ${generatedExcuses.car ? "bg-muted/50" : "bg-primary/5"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className={`h-8 w-8 ${generatedExcuses.car ? "text-muted-foreground" : "text-primary"}`} />
                      <div>
                        <p className="font-medium">自驾</p>
                        {!generatedExcuses.car && <p className="text-sm text-muted-foreground">预计用时15分钟</p>}
                      </div>
                    </div>

                    {generatedExcuses.car && (
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                      </div>
                    )}
                  </div>

                  {generatedExcuses.car && (
                    <div className="mt-2 text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                      {generatedExcuses.car}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResults ? (
            <>
              <Button variant="outline" onClick={() => router.push("/setup")}>
                返回设置
              </Button>
              <Button onClick={handlePlanRoute} disabled={!destination}>
                规划路线
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleReset}>
                重新规划
              </Button>
              <Button onClick={() => router.push("/")}>完成</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

