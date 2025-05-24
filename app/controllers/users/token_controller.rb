
class Users::TokenController < ApplicationController
  def refresh
    token = request.env["warden-jwt_auth.token"]
    render json: {
      token: token,
      user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end
end
