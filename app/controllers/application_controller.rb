class ApplicationController < ActionController::API
  respond_to :json

  private

  def current_user
    return @current_user if defined?(@current_user)

    @current_user = nil

    if request.headers["Authorization"].present?
      token = request.headers["Authorization"].split(" ").last

      begin
        jwt_payload = JWT.decode(
          token,
          Rails.application.credentials.devise_jwt_secret_key!,
          true,
          algorithm: "HS256"
        ).first

        @current_user = User.find_by(id: jwt_payload["sub"])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        @current_user = nil
      end
    end

    @current_user
  end


  def authorize!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user
  end

  def pagination_dict(object)
  {
    current_page: object.current_page,
    next_page: object.next_page,
    prev_page: object.prev_page,
    total_pages: object.total_pages,
    total_count: object.total_count
  }
  end
end
