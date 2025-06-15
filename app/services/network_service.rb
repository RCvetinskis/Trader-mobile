class NetworkService
  def self.host_url
    if Rails.env.production?
      ENV["PRODUCTION_HOST"] || "your-production-domain.com"
    else
      local_ip = Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }&.ip_address
      "http://#{local_ip}:3000"
    end
  rescue
    "http://localhost:3000"
  end
end
