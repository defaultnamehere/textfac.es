for i in *.js; do
    sed -i 's/panel/panel-material/g' $i
done
