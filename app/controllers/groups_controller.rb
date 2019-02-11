class GroupsController < ApplicationController
  before_action :set_groups, only: %i[update]
  def index
  end

  def new
    @group = Group.new
    # @group_user << current_user
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => []})
  end

  def set_groups
    @group = Group.find(params[:id])
  end
end
