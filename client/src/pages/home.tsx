import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Clock, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  Zap, 
  Brain, 
  Users, 
  DollarSign,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  Star,
  ArrowRight,
  Play,
  BarChart3,
  Cog,
  Rocket,
  Globe
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const form = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      requirements: "",
    },
  });

  const demoRequestMutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-request", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Đăng ký thành công!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDemoRequest) => {
    demoRequestMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">AutoFB AI</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => scrollToSection('solution')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Giải pháp
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Lợi ích
                </button>
                <button 
                  onClick={() => scrollToSection('technology')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Công nghệ
                </button>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Về chúng tôi
                </button>
                <Button 
                  onClick={() => scrollToSection('cta')}
                  size="sm"
                  className="bg-primary hover:bg-blue-700 text-white"
                >
                  Đăng ký Demo
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Tự động hóa</span>
                <span className="block text-primary">Quản lý Facebook</span>
                <span className="block">với AI thông minh</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Giải pháp tích hợp Google Sheets, n8n, AI Gemini và Telegram giúp tự động lập kế hoạch, 
                tạo nội dung và đăng bài Facebook một cách chuyên nghiệp và hiệu quả.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={() => scrollToSection('demo')}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Xem Demo Ngay
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg transition-all duration-300"
                    onClick={() => scrollToSection('solution')}
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
                <p className="mt-4 text-sm text-gray-500 flex items-center justify-center lg:justify-start">
                  <CheckCircle className="text-accent-green mr-2 h-4 w-4" />
                  Miễn phí tư vấn và demo • Setup trong 24h
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              {/* Workflow visualization */}
              <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 shadow-2xl">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <h3 className="text-white text-sm font-medium">AutoFB Workflow</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-white h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded px-3 py-1">
                          <span className="text-white text-xs">Google Sheets</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-px h-6 bg-gray-600"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Brain className="text-white h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded px-3 py-1">
                          <span className="text-white text-xs">AI Gemini</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-px h-6 bg-gray-600"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Globe className="text-white h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded px-3 py-1">
                          <span className="text-white text-xs">Facebook Post</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-px h-6 bg-gray-600"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="text-white h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded px-3 py-1">
                          <span className="text-white text-xs">Thông báo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-accent-green rounded-full text-xs text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Hoạt động
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-gray-50" id="problems">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Những thách thức trong quản lý Facebook thủ công
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Các phòng ban marketing và truyền thông đang đối mặt với nhiều khó khăn khi quản lý fanpage
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:scale-105 transition-all duration-300 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-red-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tốn thời gian</h3>
                <p className="text-gray-600">
                  Phải dành hàng giờ mỗi ngày để lên kế hoạch, viết nội dung và đăng bài thủ công. 
                  Công việc lặp đi lặp lại làm giảm hiệu quả.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-300 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="text-accent-orange h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dễ sai sót</h3>
                <p className="text-gray-600">
                  Quản lý thủ công dẫn đến việc đăng nhầm thời gian, quên đăng bài hoặc 
                  nội dung không nhất quán giữa các bài viết.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-300 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-purple-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bí ý tưởng</h3>
                <p className="text-gray-600">
                  Khó khăn trong việc tạo ra nội dung sáng tạo và phù hợp với từng chủ đề. 
                  Thiếu cảm hứng và ý tưởng mới để thu hút người dùng.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-300 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Khó kiểm soát</h3>
                <p className="text-gray-600">
                  Không thể theo dõi tiến độ, đánh giá hiệu quả và điều chỉnh chiến lược 
                  một cách kịp thời và chính xác.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="py-20 bg-white" id="solution">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Giải pháp tự động hóa toàn diện
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống tích hợp 4 công nghệ hàng đầu để mang lại giải pháp quản lý Facebook hoàn toàn tự động
            </p>
          </div>

          {/* System Overview Diagram */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Google Sheets</h3>
                  <p className="text-sm opacity-90">Lập kế hoạch nội dung</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="text-gray-400 h-6 w-6" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                    <Cog className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">n8n Workflow</h3>
                  <p className="text-sm opacity-90">Tự động hóa quy trình</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="text-gray-400 h-6 w-6" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Gemini</h3>
                  <p className="text-sm opacity-90">Tạo nội dung thông minh</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="text-gray-400 h-6 w-6" />
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Telegram Bot</h3>
                  <p className="text-sm opacity-90">Thông báo & kiểm soát</p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cách thức hoạt động</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lập kế hoạch trong Google Sheets</h4>
                    <p className="text-gray-600">Nhập chủ đề, thời gian đăng và các thông tin cần thiết vào bảng tính đã được thiết kế sẵn.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">n8n tự động kích hoạt</h4>
                    <p className="text-gray-600">Hệ thống theo dõi lịch trình và tự động gửi yêu cầu tạo nội dung đến AI khi đến thời gian.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Gemini tạo nội dung</h4>
                    <p className="text-gray-600">Trí tuệ nhân tạo phân tích chủ đề và tạo ra nội dung phù hợp, sáng tạo và chuyên nghiệp.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Đăng bài và thông báo</h4>
                    <p className="text-gray-600">Hệ thống tự động đăng lên Facebook và gửi thông báo qua Telegram để bạn theo dõi.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <h4 className="font-semibold text-gray-900 mb-4">Giao diện điều khiển trực tiếp</h4>
                <Card className="overflow-hidden mb-4">
                  <div className="bg-green-600 text-white px-4 py-2 text-sm font-medium flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Google Sheets - Lịch đăng bài
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="font-semibold text-gray-700">Ngày</div>
                      <div className="font-semibold text-gray-700">Chủ đề</div>
                      <div className="font-semibold text-gray-700">Trạng thái</div>
                      <div className="font-semibold text-gray-700">Thời gian</div>
                      
                      <div className="text-gray-600">24/05</div>
                      <div className="text-gray-600">Tuyển sinh</div>
                      <div><span className="bg-accent-green text-white px-2 py-1 rounded text-xs">Đã đăng</span></div>
                      <div className="text-gray-600">14:30</div>
                      
                      <div className="text-gray-600">25/05</div>
                      <div className="text-gray-600">Sự kiện</div>
                      <div><span className="bg-accent-orange text-white px-2 py-1 rounded text-xs">Lên lịch</span></div>
                      <div className="text-gray-600">09:00</div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Trạng thái hệ thống:</span>
                  <span className="flex items-center text-accent-green">
                    <div className="w-2 h-2 bg-accent-green rounded-full mr-2 animate-pulse"></div>
                    Đang hoạt động
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-white" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Lợi ích vượt trội của giải pháp
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Những giá trị thiết thực mà hệ thống mang lại cho tổ chức của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-accent-green">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="text-accent-green h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tiết kiệm 80% thời gian</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Giảm từ 4-5 giờ xuống còn 1 giờ mỗi ngày cho việc quản lý nội dung. 
                  Nhân viên có thể tập trung vào các công việc sáng tạo và chiến lược quan trọng hơn.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Độ chính xác 99%</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Loại bỏ hoàn toàn sai sót do con người như đăng nhầm giờ, quên đăng bài hay sai nội dung. 
                  Hệ thống đảm bảo đăng đúng thời gian và nội dung theo kế hoạch.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-accent-orange">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="text-accent-orange h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nội dung AI sáng tạo</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  AI Gemini tạo ra nội dung đa dạng, phù hợp với từng chủ đề và đối tượng. 
                  Không còn lo về việc bí ý tưởng hay nội dung nhàm chán.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="text-purple-500 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Kiểm soát toàn diện</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Theo dõi real-time mọi hoạt động qua Telegram. Xem báo cáo chi tiết về 
                  số lượng bài đăng, tỷ lệ tương tác và hiệu quả từng chiến dịch.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="text-cyan-500 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Quản lý đa kênh</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Quản lý nhiều fanpage cùng lúc từ một bảng điều khiển duy nhất. 
                  Phù hợp cho các tổ chức có nhiều đơn vị hoặc dự án khác nhau.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <DollarSign className="text-indigo-500 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Chi phí tiết kiệm</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Giảm 70% chi phí nhân sự cho việc quản lý social media. 
                  ROI tích cực chỉ sau 2-3 tháng triển khai với chi phí vận hành thấp.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-16 gradient-primary rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Kết quả đo lường được</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold mb-2">80%</div>
                <div className="text-lg opacity-90">Tiết kiệm thời gian</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-lg opacity-90">Độ chính xác</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Hoạt động liên tục</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Example */}
      <section className="py-20 bg-white" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ví dụ thực tế về bài đăng tự động
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Xem cách AI tạo ra nội dung chuyên nghiệp từ chủ đề đơn giản
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Input side */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Đầu vào từ Google Sheets</h3>
              <Card className="shadow-inner bg-gray-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="w-24 text-sm font-medium text-gray-700">Chủ đề:</label>
                      <Input 
                        value="Tuyển sinh ngành Công nghệ thông tin" 
                        readOnly 
                        className="flex-1 bg-white"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="w-24 text-sm font-medium text-gray-700">Ngày đăng:</label>
                      <Input 
                        value="25/05/2024" 
                        readOnly 
                        className="flex-1 bg-white"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="w-24 text-sm font-medium text-gray-700">Thời gian:</label>
                      <Input 
                        value="09:00" 
                        readOnly 
                        className="flex-1 bg-white"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="w-24 text-sm font-medium text-gray-700">Tone:</label>
                      <Input 
                        value="Thân thiện, chuyên nghiệp" 
                        readOnly 
                        className="flex-1 bg-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-primary">
                      <Brain className="h-5 w-5" />
                      <span className="text-sm font-medium">AI đang xử lý...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Output side */}
            <div className="mt-12 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Đầu ra - Bài đăng Facebook</h3>
              <Card className="shadow-lg overflow-hidden">
                {/* Facebook post header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Globe className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Trường Đại học ABC</h4>
                      <p className="text-sm text-gray-500">25 tháng 5 lúc 09:00 • <Globe className="inline h-3 w-3" /></p>
                    </div>
                  </div>
                </div>
                
                {/* Facebook post content */}
                <CardContent className="p-4">
                  <div className="text-gray-900 leading-relaxed space-y-3">
                    <p>🎓 <strong>THÔNG BÁO TUYỂN SINH NGÀNH CÔNG NGHỆ THÔNG TIN 2024</strong></p>
                    
                    <p>🌟 Bạn có đam mê với công nghệ và mong muốn trở thành chuyên gia IT tương lai? Ngành Công nghệ thông tin tại Trường Đại học ABC chính là lựa chọn hoàn hảo dành cho bạn!</p>
                    
                    <p><strong>✨ ĐIỂM NỔI BẬT:</strong><br/>
                    🔹 Chương trình đào tạo cập nhật theo chuẩn quốc tế<br/>
                    🔹 Đội ngũ giảng viên giàu kinh nghiệm thực tế<br/>
                    🔹 Trang thiết bị lab hiện đại, môi trường học tập chuyên nghiệp<br/>
                    🔹 Cơ hội thực tập tại các công ty công nghệ hàng đầu</p>
                    
                    <p>📈 <strong>Tỷ lệ có việc làm sau tốt nghiệp: 95%</strong><br/>
                    💰 <strong>Mức lương khởi điểm: 12-18 triệu/tháng</strong></p>
                    
                    <p>📞 Đăng ký tư vấn ngay: 0946734111<br/>
                    🌐 Website: www.university-abc.edu.vn</p>
                    
                    <p className="text-primary">#TuyenSinh2024 #CongNgheThongTin #DaiHocABC #IT #Technology</p>
                  </div>
                </CardContent>
                
                {/* Facebook post actions */}
                <div className="border-t border-gray-100 px-4 py-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                        👍 Thích
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                        💬 Bình luận
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                        📤 Chia sẻ
                      </Button>
                    </div>
                    <span className="text-xs">Đã đăng tự động</span>
                  </div>
                </div>
              </Card>
              
              {/* Success notification */}
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-accent-green">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Đăng bài thành công!</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Thông báo đã được gửi qua Telegram</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50" id="technology">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Công nghệ nền tảng đáng tin cậy
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tích hợp các công nghệ hàng đầu thế giới để đảm bảo hiệu suất và độ tin cậy cao nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="text-green-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Google Sheets</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nền tảng bảng tính trực tuyến của Google, cho phép quản lý và 
                  lập kế hoạch nội dung một cách trực quan và dễ dàng.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Cloud-based
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Cog className="text-purple-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">n8n Workflow</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Công cụ tự động hóa quy trình mã nguồn mở, kết nối các ứng dụng 
                  và dịch vụ để tạo ra luồng công việc tự động.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    <Zap className="mr-1 h-3 w-3" />
                    Automation
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Google Gemini AI</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mô hình AI tiên tiến của Google, có khả năng tạo ra nội dung 
                  chất lượng cao, sáng tạo và phù hợp với ngữ cảnh.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    <Star className="mr-1 h-3 w-3" />
                    AI-Powered
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="text-cyan-600 h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Telegram Bot</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nền tảng nhắn tin bảo mật cao, được sử dụng để gửi thông báo 
                  real-time và kiểm soát hệ thống từ xa.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                    <Zap className="mr-1 h-3 w-3" />
                    Real-time
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical advantages */}
          <Card className="mt-16 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Ưu điểm kỹ thuật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                    <Shield className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Bảo mật cao</h4>
                    <p className="text-sm text-gray-600">Tất cả dữ liệu được mã hóa và lưu trữ an toàn trên Google Cloud</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Zap className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Khả năng mở rộng</h4>
                    <p className="text-sm text-gray-600">Dễ dàng thêm nhiều fanpage và tùy chỉnh theo nhu cầu</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                    <Rocket className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Đồng bộ real-time</h4>
                    <p className="text-sm text-gray-600">Cập nhật tức thời mọi thay đổi từ Google Sheets</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-white" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Đội ngũ phát triển
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Sáng kiến từ các chuyên gia công nghệ thông tin có kinh nghiệm thực tế trong giáo dục
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Câu chuyện phát triển</h3>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Giải pháp được phát triển bởi đội ngũ chuyên gia công nghệ thông tin tại một 
                  trường đại học hàng đầu, với hơn 10 năm kinh nghiệm trong lĩnh vực giáo dục 
                  và truyền thông số.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Xuất phát từ nhu cầu thực tế trong việc quản lý fanpage của nhà trường, 
                  chúng tôi đã nghiên cứu và phát triển hệ thống này để giải quyết các bài toán 
                  cụ thể mà các tổ chức giáo dục và doanh nghiệp đang gặp phải.
                </p>
                
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Cam kết của chúng tôi</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="text-accent-green mr-3 h-4 w-4" />
                        Hỗ trợ 24/7 trong quá trình triển khai
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-accent-green mr-3 h-4 w-4" />
                        Đào tạo sử dụng miễn phí cho đội ngũ
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-accent-green mr-3 h-4 w-4" />
                        Cập nhật và nâng cấp liên tục
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="text-accent-green mr-3 h-4 w-4" />
                        Tùy chỉnh theo yêu cầu cụ thể
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-1 gap-6">

                <Card className="bg-gradient-to-r from-primary/5 to-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Users className="text-white h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">ThS. Nguyễn Văn A</h4>
                        <p className="text-primary font-medium">Trưởng nhóm phát triển</p>
                        <p className="text-sm text-gray-600">10+ năm kinh nghiệm phát triển hệ thống</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-green-50 to-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center">
                        <Brain className="text-white h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">KS. Trần Thị B</h4>
                        <p className="text-accent-green font-medium">Chuyên gia AI & Automation</p>
                        <p className="text-sm text-gray-600">Chuyên về tích hợp AI và tự động hóa</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-orange-50 to-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center">
                        <Star className="text-white h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">ThS. Lê Văn C</h4>
                        <p className="text-accent-orange font-medium">Chuyên gia UX/UI</p>
                        <p className="text-sm text-gray-600">Thiết kế trải nghiệm người dùng</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
          
              <Card className="mt-8 bg-gray-900 text-white">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-4">Thông tin liên hệ</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-400 h-4 w-4" />
                      <span>nmson@lhu.edu.vn</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-gray-400 h-4 w-4" />
                      <span>0946734111</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="text-gray-400 h-4 w-4" />
                      <span>Trường Đại học ABC, TP.HCM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 gradient-primary" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Sẵn sàng tự động hóa Facebook của bạn?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Tham gia cùng hàng trăm tổ chức đã tin tưởng và sử dụng giải pháp của chúng tôi. 
              Đăng ký demo miễn phí ngay hôm nay để trải nghiệm sức mạnh của tự động hóa AI.
            </p>
            
            {/* CTA Form */}
            <Card className="max-w-2xl mx-auto shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Đăng ký Demo miễn phí</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và tên *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nguyễn Văn A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số điện thoại *</FormLabel>
                            <FormControl>
                              <Input placeholder="0946734111" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhu cầu cụ thể</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={3}
                              placeholder="Mô tả ngắn gọn về nhu cầu và số lượng fanpage cần quản lý..."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-primary hover:bg-blue-700 text-white py-4 text-lg shadow-lg hover:scale-105 transition-all duration-300"
                      disabled={demoRequestMutation.isPending}
                    >
                      {demoRequestMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-2 h-5 w-5" />
                          Đăng ký Demo Miễn phí
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="text-accent-green mr-2 h-4 w-4" />
                    <span>Demo trong 24h</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="text-accent-green mr-2 h-4 w-4" />
                    <span>Bảo mật tuyệt đối</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-accent-green mr-2 h-4 w-4" />
                    <span>Hoàn toàn miễn phí</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Alternative contact methods */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2">Gọi trực tiếp</h4>
                <p className="text-blue-100">0946734111</p>
                <p className="text-sm text-blue-200">8:00 - 17:00 (T2-T6)</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2">Gửi email</h4>
                <p className="text-blue-100">nmson@lhu.edu.vn</p>
                <p className="text-sm text-blue-200">Phản hồi trong 2h</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2">Chat Zalo</h4>
                <p className="text-blue-100"><a href="">Nguyễn Minh Sơn</a></p>
                <p className="text-sm text-blue-200">Hỗ trợ tức thì</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AutoFB AI</h3>
              <p className="text-gray-400 leading-relaxed">
                Giải pháp tự động hóa quản lý Facebook thông minh, 
                giúp tổ chức tiết kiệm thời gian và nâng cao hiệu quả truyền thông.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Giải pháp</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tự động đăng bài</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tạo nội dung AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quản lý đa kênh</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Báo cáo thống kê</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tài liệu hướng dẫn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Theo dõi để cập nhật tính năng mới
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoFB AI. Tất cả quyền được bảo lưu.</p>
            <p className="mt-2 text-sm">
              Được phát triển bởi Trường Đại học ABC - Khoa Công nghệ thông tin
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
