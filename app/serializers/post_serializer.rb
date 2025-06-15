
class PostSerializer < ActiveModel::Serializer
attributes :id, :title, :description, :created_at,
             :updated_at, :category_id, :user_id, :images, :price, :trade

  def images
    object.images.map do |image|
      {
        id: image.id,
        filename: image.filename.to_s,
        content_type: image.content_type,
        url: url_for_image(image)
      }
    end
  end

  private

  def url_for_image(image)
    if Rails.env.production?
      Rails.application.routes.url_helpers.url_for(image)
    else
      Rails.application.routes.url_helpers.rails_blob_url(image,  host: NetworkService.host_url)
    end
  end
end
