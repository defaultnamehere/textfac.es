for i in *.css; do
    sed -i 's/modal/modal-material/g' $i
done
