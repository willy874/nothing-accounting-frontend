import { useForm } from "react-hook-form";

export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("example", { required: true })} />
        {errors.example && <span>This field is required</span>}
        <button type="submit" />
      </form>
    </div>
  );
}
