'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"

// Mock data for demonstration purposes
const mockFeeds = ['Feed A', 'Feed B', 'Feed C']
const mockPresets = [
  { id: 'metro-weekday', label: 'Metro Weekday' },
  { id: 'weekend-service', label: 'Weekend Service' },
  { id: 'holiday-schedule', label: 'Holiday Schedule' },
  { id: 'night-owl', label: 'Night Owl Service' },
  { id: 'rush-hour', label: 'Rush Hour Service' },
  { id: 'special-event', label: 'Special Event Service' },
]
const mockRouteData = [
  { id: 1, name: 'Route 1', beforeTrips: 100, afterTrips: 110, beforeHours: 200, afterHours: 220 },
  { id: 2, name: 'Route 2', beforeTrips: 80, afterTrips: 75, beforeHours: 160, afterHours: 150 },
  { id: 3, name: 'Route 3', beforeTrips: 120, afterTrips: 130, beforeHours: 240, afterHours: 260 },
]

export function TransitChangeViewer() {
  const [beforeDate, setBeforeDate] = useState('')
  const [afterDate, setAfterDate] = useState('')
  const [beforeFeed, setBeforeFeed] = useState('')
  const [afterFeed, setAfterFeed] = useState('')
  const [selectedPresets, setSelectedPresets] = useState<string[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate summary statistics
  const totalBeforeTrips = mockRouteData.reduce((sum, route) => sum + route.beforeTrips, 0)
  const totalAfterTrips = mockRouteData.reduce((sum, route) => sum + route.afterTrips, 0)
  const totalBeforeHours = mockRouteData.reduce((sum, route) => sum + route.beforeHours, 0)
  const totalAfterHours = mockRouteData.reduce((sum, route) => sum + route.afterHours, 0)

  const tripsDiff = totalAfterTrips - totalBeforeTrips
  const hoursDiff = totalAfterHours - totalBeforeHours
  const routesDiff = 0 // Assuming no change in number of routes for this example

  const togglePreset = (presetId: string) => {
    setSelectedPresets(prev =>
      prev.includes(presetId)
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Transit Service Change Comparison</h1>
      
      {/* Control Panel */}
      <div className="space-y-6">
        {/* Presets */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Presets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {mockPresets.map((preset) => (
              <div key={preset.id} className="flex items-center space-x-2">
                <Checkbox
                  id={preset.id}
                  checked={selectedPresets.includes(preset.id)}
                  onCheckedChange={() => togglePreset(preset.id)}
                />
                <label
                  htmlFor={preset.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {preset.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between"
          >
            Advanced Options
            {showAdvanced ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 border rounded-md">
            <div className="space-y-2">
              <Label htmlFor="before-date">Before Date</Label>
              <div className="flex">
                <Input
                  id="before-date"
                  type="date"
                  value={beforeDate}
                  onChange={(e) => setBeforeDate(e.target.value)}
                  className="rounded-r-none"
                />
                <Select onValueChange={setBeforeFeed}>
                  <SelectTrigger className="w-[140px] rounded-l-none">
                    <SelectValue placeholder="Select feed" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFeeds.map((feed) => (
                      <SelectItem key={feed} value={feed}>{feed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="after-date">After Date</Label>
              <div className="flex">
                <Input
                  id="after-date"
                  type="date"
                  value={afterDate}
                  onChange={(e) => setAfterDate(e.target.value)}
                  className="rounded-r-none"
                />
                <Select onValueChange={setAfterFeed}>
                  <SelectTrigger className="w-[140px] rounded-l-none">
                    <SelectValue placeholder="Select feed" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFeeds.map((feed) => (
                      <SelectItem key={feed} value={feed}>{feed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trips Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tripsDiff > 0 ? '+' : ''}{tripsDiff}</div>
            <p className="text-xs text-muted-foreground">
              {((tripsDiff / totalBeforeTrips) * 100).toFixed(2)}% change
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Hours Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hoursDiff > 0 ? '+' : ''}{hoursDiff}</div>
            <p className="text-xs text-muted-foreground">
              {((hoursDiff / totalBeforeHours) * 100).toFixed(2)}% change
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Routes Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routesDiff > 0 ? '+' : ''}{routesDiff}</div>
            <p className="text-xs text-muted-foreground">
              {routesDiff === 0 ? 'No change' : `${Math.abs(routesDiff)} ${routesDiff > 0 ? 'added' : 'removed'}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Before Trips</TableHead>
                <TableHead>After Trips</TableHead>
                <TableHead>Trips Difference</TableHead>
                <TableHead>Before Hours</TableHead>
                <TableHead>After Hours</TableHead>
                <TableHead>Hours Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRouteData.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>{route.beforeTrips}</TableCell>
                  <TableCell>{route.afterTrips}</TableCell>
                  <TableCell>{route.afterTrips - route.beforeTrips}</TableCell>
                  <TableCell>{route.beforeHours}</TableCell>
                  <TableCell>{route.afterHours}</TableCell>
                  <TableCell>{route.afterHours - route.beforeHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}