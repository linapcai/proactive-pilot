import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your Customer Copilot AI. Ask me anything about your customers, like 'Show me at-risk customers in Risk BU' or 'What's the trend for Enterprise Plus?'",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("at-risk") && lowerQuery.includes("risk bu")) {
      return "I found 3 at-risk customers in Risk BU: Global Dynamics (12 days since last contact), TechFlow Solutions (declining usage), and DataCorp (missed last 2 meetings). Would you like me to draft engagement emails for them?"
    }
    
    if (lowerQuery.includes("enterprise plus")) {
      return "Enterprise Plus is showing strong growth: 88% usage (↑18%), $45,200/mo revenue. They're perfect for an upsell conversation - usage trending up significantly over the past month."
    }
    
    if (lowerQuery.includes("opportunity") || lowerQuery.includes("upsell")) {
      return "I've identified 6 expansion opportunities: Enterprise Plus ($45K/mo), InnovateLab ($18K/mo), and 4 others showing 85%+ usage. Combined potential: $180K+ in additional ARR."
    }
    
    return "I'm analyzing your customer data. Here are some insights I can help with: customer health trends, revenue opportunities, engagement recommendations, and business unit analysis. What specific area would you like to explore?"
  }

  const suggestions = [
    "Show me at-risk customers in Risk BU",
    "What's the trend for Enterprise Plus?", 
    "Find expansion opportunities",
    "Summarize this week's activities"
  ]

  return (
    <div className="w-80 flex flex-col h-full bg-card/30 backdrop-blur-sm border-l">
      {/* Header */}
      <div className="p-4 border-b border-border/60">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Ask Copilot</h3>
        </div>
        <p className="text-xs text-muted-foreground">Get AI insights about your customers</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
            {message.type === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-3 w-3 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : ""}`}>
              <Card className={`p-3 ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-muted/50"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
            {message.type === "user" && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1 order-3">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            </div>
            <Card className="p-3 bg-muted/50">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setInputValue(suggestion)}
                className="w-full text-left justify-start text-xs h-auto p-2 hover:bg-muted/50"
              >
                "{suggestion}"
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/60">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your customers..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="h-9 w-9 flex-shrink-0"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}