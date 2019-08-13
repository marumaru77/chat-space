class Api::MessagesController < ApplicationController
  protect_from_forgery
  
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end
end