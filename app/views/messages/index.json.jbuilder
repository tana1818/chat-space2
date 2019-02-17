# json.array! @new_messages do |new_message|
#   json.content  new_message.content
#   json.image  new_message.image
#   json.user_name  new_message.user.name
#   json.date  format_posted_time(new_message.created_at)
#   json.is_content_present  new_message.content.present?
#   json.is_image_present  new_message.image.present?
#   json.id  new_message.id
# end

json.array! @new_messages.each do |message|
  json.id message.id
  json.content message.content
  json.name message.user.name
  json.date message.created_at
  json.image message.image
end
