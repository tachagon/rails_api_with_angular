class EntriesController < ApplicationController

  before_action :set_entry, only: [:show, :update, :destroy]

  def index
    @entries = Entry.all
    render json: @entries
  end

  def show
    render json: @entry
  end

  def create
    @entry = Entry.new(entry_params)

    if @entry.save
      render json: @entry, status: :created, location: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  def update
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @entry.destroy
  end

  private

    def set_entry
      @entry = Entry.find(params[:id])
    end

    def entry_params
      params.require(:entry).permit(:name, :winner)
    end
end
