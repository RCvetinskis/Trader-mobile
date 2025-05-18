class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

def create
  build_resource(sign_up_params)

if resource.save
  render json: { message: "Signed up successfully." }, status: :ok
else
  render json: { message: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
end
end


  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end

  def respond_to_on_destroy
    head :no_content
  end
end
