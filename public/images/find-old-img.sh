for f in *
do

 lines=$(grep $f ../*.html ../css/*.css | wc -l)
if [ $lines -eq 0 ]; then
  echo "$f"
fi
done

